"""Extract paragraph/run typography from Lucas CV docx (OOXML). Writes UTF-8 report."""
from __future__ import annotations

import argparse
import json
import os
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def q(name: str) -> str:
    return W + name


def twip_to_pt(tw: str | None) -> float | None:
    if tw is None:
        return None
    try:
        return int(tw) / 20.0
    except ValueError:
        return None


def half_pt(sz_val: str | None) -> float | None:
    if sz_val is None:
        return None
    try:
        return int(sz_val) / 2.0
    except ValueError:
        return None


def _val(el: ET.Element) -> str | None:
    for k, v in el.attrib.items():
        if k.endswith("}val"):
            return v
    return None


def get_run_props(run: ET.Element) -> dict:
    rpr = run.find(q("rPr"))
    out: dict = {}
    if rpr is None:
        return out
    for child in rpr:
        tag = child.tag.split("}")[-1]
        if tag == "sz":
            v = _val(child)
            if v:
                out["sz_pt"] = half_pt(v)
        elif tag == "color":
            v = _val(child)
            if v:
                out["color"] = v
        elif tag == "rFonts":
            out["font_ascii"] = child.get(q("ascii"))
            out["font_hAnsi"] = child.get(q("hAnsi"))
        elif tag == "b":
            out["bold"] = True
    return out


def get_para_props(para: ET.Element) -> dict:
    ppr = para.find(q("pPr"))
    out: dict = {}
    if ppr is None:
        return out
    ps = ppr.find(q("pStyle"))
    if ps is not None:
        out["pStyle"] = _val(ps)
    jc = ppr.find(q("jc"))
    if jc is not None:
        out["jc"] = _val(jc)
    sp = ppr.find(q("spacing"))
    if sp is not None:
        line = None
        line_rule = None
        for k, v in sp.attrib.items():
            local = k.split("}")[-1]
            if local == "before":
                out["spacing_before_pt"] = twip_to_pt(v)
            elif local == "after":
                out["spacing_after_pt"] = twip_to_pt(v)
            elif local == "line":
                line = v
            elif local == "lineRule":
                line_rule = v
        if line:
            try:
                if line_rule == "auto":
                    out["line_spacing_multiple"] = int(line) / 240.0
                else:
                    out["line_spacing_pt"] = twip_to_pt(line)
            except ValueError:
                pass
    ind = ppr.find(q("ind"))
    if ind is not None:
        for k, v in ind.attrib.items():
            local = k.split("}")[-1]
            if local == "left":
                out["left_pt"] = twip_to_pt(v)
            elif local == "hanging":
                out["hanging_pt"] = twip_to_pt(v)
            elif local == "firstLine":
                out["firstLine_pt"] = twip_to_pt(v)
    return out


def para_text(para: ET.Element) -> str:
    parts: list[str] = []
    for t in para.iter(q("t")):
        if t.text:
            parts.append(t.text)
        if t.tail:
            parts.append(t.tail)
    return "".join(parts)


def main() -> None:
    ap = argparse.ArgumentParser(description="Extract OOXML paragraph/run styles from a .docx")
    ap.add_argument(
        "docx",
        nargs="?",
        default=os.environ.get("CV_DOCX", ""),
        help="Path to .docx (default: CV_DOCX env)",
    )
    args = ap.parse_args()
    if not args.docx:
        ap.error("Pass a .docx path or set CV_DOCX")
    docx = Path(args.docx)
    if not docx.is_file():
        raise SystemExit(f"Not a file: {docx}")

    out_path = Path(__file__).resolve().parents[1] / "tmp-cv-compare" / "docx-extract.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(docx) as z:
        root = ET.fromstring(z.read("word/document.xml"))
        styles_xml = z.read("word/styles.xml")
        root_styles = ET.fromstring(styles_xml)

    rows: list[dict] = []
    for pi, para in enumerate(root.iter(q("p"))):
        text = para_text(para).replace("\u3161", "[?]").strip()
        if not text:
            continue
        pprops = get_para_props(para)
        runs_detail: list[dict] = []
        for run in para.findall(q("r")):
            rt = para_text(run).strip()
            if not rt:
                continue
            rp = get_run_props(run)
            runs_detail.append({"text": rt[:80], **rp})
        rows.append(
            {
                "i": pi,
                "text": text[:100],
                "pPr": pprops,
                "runs": runs_detail,
            },
        )

    # map styleId -> base rPr from styles
    style_defs: dict[str, dict] = {}
    for st in root_styles.iter(q("style")):
        sid = None
        for k, v in st.attrib.items():
            if k.endswith("}styleId"):
                sid = v
                break
        if not sid:
            continue
        rpr = st.find(q("rPr"))
        if rpr is None:
            continue
        d: dict = {}
        sz = rpr.find(q("sz"))
        if sz is not None:
            v = _val(sz)
            if v:
                d["sz_pt"] = half_pt(v)
        col = rpr.find(q("color"))
        if col is not None:
            v = _val(col)
            if v:
                d["color"] = v
        rf = rpr.find(q("rFonts"))
        if rf is not None:
            d["ascii"] = rf.get(q("ascii"))
        if rpr.find(q("b")) is not None:
            d["bold"] = True
        if d:
            style_defs[sid] = d

    # section properties / page margins from document
    sect_pr = None
    for body in root.iter(q("body")):
        sect = body.find(q("sectPr"))
        if sect is not None:
            sect_pr = sect
            break
    margins: dict = {}
    if sect_pr is not None:
        pg = sect_pr.find(q("pgSz"))
        if pg is not None:
            for k, v in pg.attrib.items():
                ln = k.split("}")[-1]
                if ln in ("w", "h"):
                    margins[f"page_{ln}_tw"] = v
        mg = sect_pr.find(q("pgMar"))
        if mg is not None:
            for k, v in mg.attrib.items():
                ln = k.split("}")[-1]
                if ln in ("top", "right", "bottom", "left", "header", "footer", "gutter"):
                    margins[f"mar_{ln}_pt"] = twip_to_pt(v)

    payload = {"paragraphs": rows, "style_defs": style_defs, "section": margins}
    out_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print("Wrote", out_path)


if __name__ == "__main__":
    main()

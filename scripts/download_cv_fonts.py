#!/usr/bin/env python3
"""Download CV PDF fonts (Lato + Raleway) into public/cv-fonts/ for react-pdf.

Run locally or in Docker, e.g.:
  docker compose --profile cv run --rm cv-tools python scripts/download_cv_fonts.py
"""
from __future__ import annotations

import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "cv-fonts"

# Lato: google/fonts OFL. Raleway: gstatic non-variable TTFs (same files as prior Font.register URLs).
FILES: dict[str, str] = {
    "Lato-Regular.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/lato/Lato-Regular.ttf",
    "Lato-Bold.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/lato/Lato-Bold.ttf",
    "Raleway-Regular.ttf": "https://fonts.gstatic.com/s/raleway/v37/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCP.ttf",
    "Raleway-Bold.ttf": "https://fonts.gstatic.com/s/raleway/v37/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pYCP.ttf",
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, url in FILES.items():
        dest = OUT / name
        if dest.is_file() and dest.stat().st_size > 10_000:
            print("skip (exists)", dest)
            continue
        print("fetch", url)
        urllib.request.urlretrieve(url, dest)
        print("wrote", dest, dest.stat().st_size, "bytes")


if __name__ == "__main__":
    main()

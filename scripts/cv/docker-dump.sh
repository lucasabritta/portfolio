#!/usr/bin/env sh
# Render CV PDF inside the Compose `frontend` service (same Node/yarn as CI).
set -e
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
docker compose run --rm \
  -e RENDER_CV_PDF=1 \
  -e CV_PDF_OUT=/workspace/tmp-cv-compare/docker-latest-cv.pdf \
  frontend yarn vitest run lib/cv-pdf/cv-pdf-dump.test.ts
printf '%s\n' "Output: tmp-cv-compare/docker-latest-cv.pdf (repo root, bind-mounted from the container)"

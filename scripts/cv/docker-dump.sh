#!/usr/bin/env sh
# Render CV PDF inside the Compose `frontend` service (same Node/yarn as CI).
set -e
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
docker compose run --rm \
  -e RENDER_CV_PDF=1 \
  -e CV_PDF_OUT=/app/tmp-cv-compare/docker-latest-cv.pdf \
  frontend yarn vitest run app/api/cv/route.test.ts
printf '%s\n' "Output: tmp-cv-compare/docker-latest-cv.pdf"

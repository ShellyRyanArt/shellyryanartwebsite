#!/usr/bin/env bash
# Pulls the 12 detail images from the live site into public/images/gallery/.
# Run this from the repo root BEFORE pushing the orleans-cta-and-sync branch —
# otherwise the detail pages will render broken image placeholders.
#
# Safe to re-run. If an image already exists locally, it's skipped.
# If a remote image doesn't exist (404), it's reported and skipped.

set -euo pipefail

TARGET_DIR="public/images/gallery"
BASE_URL="https://shellyryan.art/images/gallery"

# slug-root : matches the filename prefix used in pieces.ts
PIECES=(bee pelican temptation trout oyster cricket)

mkdir -p "$TARGET_DIR"

echo "Pulling detail images into $TARGET_DIR"
echo ""

missing=()
skipped=()
fetched=()

for slug in "${PIECES[@]}"; do
  for n in 1 2; do
    filename="${slug}-detail-${n}.jpg"
    dest="$TARGET_DIR/$filename"
    url="$BASE_URL/$filename"

    if [ -f "$dest" ]; then
      skipped+=("$filename")
      printf "  [skip]    %-35s (already present)\n" "$filename"
      continue
    fi

    if curl -sfL --max-time 30 -o "$dest" "$url"; then
      size=$(wc -c < "$dest")
      fetched+=("$filename")
      printf "  [ok]      %-35s (%d bytes)\n" "$filename" "$size"
    else
      rm -f "$dest"
      missing+=("$filename")
      printf "  [MISSING] %-35s (not found on live site)\n" "$filename"
    fi
  done
done

echo ""
echo "Summary:"
echo "  fetched: ${#fetched[@]}"
echo "  skipped: ${#skipped[@]}"
echo "  missing: ${#missing[@]}"

if [ "${#missing[@]}" -gt 0 ]; then
  echo ""
  echo "Some detail images were not found on the live site:"
  for f in "${missing[@]}"; do echo "  - $f"; done
  echo ""
  echo "ACTION: Edit data/pieces.ts and remove the 'detailImages' array"
  echo "from any piece whose images are in the missing list above."
  echo "The detail page handles this gracefully — the 'Detail views'"
  echo "section simply won't render for pieces without detail images."
  exit 1
fi

echo ""
echo "All detail images present. Safe to commit + push."

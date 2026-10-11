"""Rebuild the small, redistributable PDF font after editing curated notes.

Usage: python3 scripts/subset-font.py /path/to/NotoSansTC.ttf
FontTools is a build-time tool only; the web app needs no Python runtime.
"""
from pathlib import Path
import sys
from fontTools import subset
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parent.parent
texts = [
    (root / "src/data/resources.ts").read_text(),
    (root / "src/lib/pdf.ts").read_text(),
]
characters = set("".join(texts))
characters.update(chr(n) for n in range(32, 127))
options = subset.Options()
options.name_IDs = ["*"]
options.name_legacy = True
options.name_languages = ["*"]
font = subset.load_font(sys.argv[1], options)
if "fvar" in font:
    font = instantiateVariableFont(font, {"wght": 400}, inplace=True)
subsetter = subset.Subsetter(options=options)
subsetter.populate(text="".join(sorted(characters)))
subsetter.subset(font)
output = root / "public/fonts/NotoSansTC-Notes.ttf"
output.parent.mkdir(parents=True, exist_ok=True)
subset.save_font(font, str(output), options)
print(f"{output}: {output.stat().st_size} bytes, {len(characters)} characters")

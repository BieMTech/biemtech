// fix-mojibake.js
// Reverses Windows-1252 mojibake back to proper UTF-8 in guide-i18n.js.
// The file was reconstructed via PowerShell heredocs that mis-encoded
// non-ASCII chars: each original UTF-8 byte was treated as a Windows-1252
// codepoint and stored as its Unicode equivalent. This script reverses that.

const fs = require("fs");

// Windows-1252 0x80–0x9F → Unicode codepoints (the non-Latin-1 ones)
const W1252_TO_BYTE = new Map([
  [0x20ac, 0x80], // €
  [0x201a, 0x82], // ‚
  [0x0192, 0x83], // ƒ
  [0x201e, 0x84], // „
  [0x2026, 0x85], // …
  [0x2020, 0x86], // †
  [0x2021, 0x87], // ‡
  [0x02c6, 0x88], // ˆ
  [0x2030, 0x89], // ‰
  [0x0160, 0x8a], // Š
  [0x2039, 0x8b], // ‹
  [0x0152, 0x8c], // Œ
  [0x017d, 0x8e], // Ž
  [0x2018, 0x91], // '
  [0x2019, 0x92], // '
  [0x201c, 0x93], // "
  [0x201d, 0x94], // "
  [0x2022, 0x95], // •
  [0x2013, 0x96], // –
  [0x2014, 0x97], // —
  [0x02dc, 0x98], // ˜
  [0x2122, 0x99], // ™
  [0x0161, 0x9a], // š
  [0x203a, 0x9b], // ›
  [0x0153, 0x9c], // œ
  [0x017e, 0x9e], // ž
  [0x0178, 0x9f], // Ÿ
]);

function fixMojibake(text) {
  const bytes = [];
  for (let i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i);
    if (cp <= 0x7f) {
      // ASCII – pass through unchanged
      bytes.push(cp);
    } else if (cp >= 0xa0 && cp <= 0xff) {
      // Latin-1 supplement: Windows-1252 byte = Unicode codepoint
      bytes.push(cp);
    } else if (W1252_TO_BYTE.has(cp)) {
      // Windows-1252 special chars (0x80–0x9F defined range)
      bytes.push(W1252_TO_BYTE.get(cp));
    } else if (cp >= 0x80 && cp <= 0x9f) {
      // C1 control area – undefined in W1252, treat as byte = codepoint
      bytes.push(cp);
    } else {
      // True Unicode (e.g. emoji U+1F000+, CJK > U+00FF not in W1252)
      // These are already correct UTF-8 chars – re-encode them as UTF-8
      const buf = Buffer.from(String.fromCodePoint(cp), "utf8");
      for (const b of buf) bytes.push(b);
      if (cp > 0xffff) i++; // skip the low surrogate in UCS-2 strings
    }
  }
  return Buffer.from(bytes).toString("utf8");
}

const src = "guide-i18n.js";
const content = fs.readFileSync(src, "utf8");
const fixed = fixMojibake(content);
fs.writeFileSync(src, fixed, "utf8");
console.log("guide-i18n.js fixed – mojibake → UTF-8 conversion complete.");

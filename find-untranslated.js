// Find elements with visible text but NO data-i18n attribute
const fs = require("fs");
const path = require("path");
const root = "c:/Users/bismayilov/Documents/projects/biemtech";

const htmlFiles = [
  "index.html",
  "math-kids.html",
  "guide/index.html",
  "guide/theme.html",
  "guide/age.html",
  "guide/home.html",
  "guide/daily.html",
  "guide/practice.html",
  "guide/speed.html",
  "guide/mixed.html",
  "guide/mistakes.html",
  "guide/battle.html",
  "guide/result.html",
  "guide/statistics.html",
  "guide/profile.html",
  "guide/shop.html",
  "guide/settings.html",
  "guide/parent.html",
];

// Matches opening tag + inner text (single-line, no nested tags)
// Looks for elements WITHOUT data-i18n that have text content
const tagRe =
  /<(h[1-6]|p|li|span|label|button|td|th|caption|figcaption|dt|dd)([^>]*)>((?:[^<]{3,}))<\/(h[1-6]|p|li|span|label|button|td|th|caption|figcaption|dt|dd)>/g;

const results = [];
for (const f of htmlFiles) {
  const html = fs.readFileSync(path.join(root, f), "utf8");
  // Remove comments, script, style sections first
  const cleaned = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "");

  let m;
  tagRe.lastIndex = 0;
  while ((m = tagRe.exec(cleaned)) !== null) {
    const attrs = m[2];
    const text = m[3].trim();
    // Skip if has data-i18n
    if (attrs.includes("data-i18n")) continue;
    // Skip if text is only whitespace, numbers, icons/emoji, punctuation, or very short
    if (!text || text.length < 4) continue;
    // Skip if text contains only numbers/symbols/emoji
    if (/^[\d\s\W]+$/.test(text)) continue;
    // Skip if it's mostly code or URLs
    if (text.includes("http") || text.includes("{") || text.includes("<"))
      continue;
    // Skip if class suggests non-translatable (icon, num, badge, etc.)
    if (
      /class="[^"]*?(icon|num|badge|emoji|code|tag|version)[^"]*?"/.test(attrs)
    )
      continue;

    // Get line number
    const before = cleaned.substring(0, m.index);
    const lineNum = (before.match(/\n/g) || []).length + 1;

    results.push({
      file: f,
      line: lineNum,
      tag: m[1],
      attrs: attrs.trim().substring(0, 60),
      text: text.substring(0, 80),
    });
  }
}

console.log(`Found ${results.length} potentially untranslated elements:\n`);
let curFile = "";
for (const r of results) {
  if (r.file !== curFile) {
    curFile = r.file;
    console.log(`\n=== ${r.file} ===`);
  }
  console.log(
    `  L${r.line}: <${r.tag}${r.attrs ? " " + r.attrs : ""}> "${r.text}"`,
  );
}

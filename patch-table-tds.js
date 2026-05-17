// Patch age.html td cells and practice.html td cells using Unicode escapes for emoji
const fs = require("fs");
const path = require("path");
const root = "c:/Users/bismayilov/Documents/projects/biemtech";

// ─── age.html td patches ─────────────────────────────────────────────────────
let html = fs.readFileSync(path.join(root, "guide/age.html"), "utf8");
let count = 0;

// Strategy: replace only specific td elements using text content as anchor
// Use simple string replace on each unique text

function patchTd(content, oldInner, key) {
  const old = `<td>${oldInner}</td>`;
  const neu = `<td data-i18n="${key}">${oldInner}</td>`;
  if (!content.includes(old)) {
    console.error("NOT FOUND: " + old.substring(0, 60));
    return content;
  }
  count++;
  return content.replace(old, neu);
}
function patchTdAll(content, oldInner, key) {
  // Replace all occurrences (for repeated values)
  const old = `<td>${oldInner}</td>`;
  const neu = `<td data-i18n="${key}">${oldInner}</td>`;
  const c = (
    content.match(
      new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
    ) || []
  ).length;
  if (c === 0) {
    console.error("NOT FOUND: " + old.substring(0, 60));
    return content;
  }
  count += c;
  return content.split(old).join(neu);
}

// Group names (some repeated)
html = patchTdAll(html, "\uD83D\uDC23 Tiny Tots", "age_group_tiny");
html = patchTd(html, "\uD83D\uDC24 Explorers", "age_group_explorers");
html = patchTd(html, "\uD83C\uDF1F Stars", "age_group_stars");
html = patchTd(html, "\uD83E\uDD8A Adventurers", "age_group_adventurers");
html = patchTd(html, "\uD83D\uDC2F Challengers", "age_group_challengers");
html = patchTd(html, "\uD83E\uDD81 Champions", "age_group_champions");
html = patchTd(html, "\uD83D\uDE80 Math Masters", "age_group_masters");

// Operations
html = patchTd(html, "Addition only (small numbers)", "age_ops_add_small");
html = patchTd(html, "Addition only (slightly larger)", "age_ops_add_large");
html = patchTd(html, "Addition + visual arithmetic", "age_ops_add_visual");
html = patchTd(html, "Addition &amp; Subtraction", "age_ops_add_sub");
html = patchTd(html, "+ \u2212 \u00d7 and Triple ops", "age_ops_triple");
html = patchTd(html, "+ \u2212 \u00d7 \u00f7 Compound ops", "age_ops_compound");
html = patchTd(html, "Full set including advanced compound", "age_ops_full");

// Input styles (some repeated — use patchTd for unique, patchTdAll for repeated)
html = patchTdAll(html, "Picture / icon matching", "age_input_picture");
html = patchTd(html, "Visual icons + multiple choice", "age_input_visual");
html = patchTdAll(html, "Multiple choice (4 options)", "age_input_mc");
html = patchTdAll(html, "Typed numeric answer", "age_input_typed");

fs.writeFileSync(path.join(root, "guide/age.html"), html, "utf8");
console.log("age.html: " + count + " td cells patched");

// ─── practice.html td patches ─────────────────────────────────────────────────
count = 0;
let phtml = fs.readFileSync(path.join(root, "guide/practice.html"), "utf8");

phtml = patchTd(phtml, "\u2795 Addition", "practice_op_add");
phtml = patchTd(phtml, "\u2796 Subtraction", "practice_op_sub");
phtml = patchTd(phtml, "\u2716\uFE0F Multiplication", "practice_op_mul");
phtml = patchTd(phtml, "\u2797 Division", "practice_op_div");
phtml = patchTd(phtml, "\uD83D\uDD22 Triple ops", "practice_op_triple");
phtml = patchTd(phtml, "\uD83D\uDD23 Compound ops", "practice_op_compound");

fs.writeFileSync(path.join(root, "guide/practice.html"), phtml, "utf8");
console.log("practice.html: " + count + " td cells patched");

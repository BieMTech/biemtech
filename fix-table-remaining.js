// Fix remaining td cells using regex (emoji-safe)
const fs = require("fs");
const path = require("path");
const root = "c:/Users/bismayilov/Documents/projects/biemtech";

// Regex-based replacement that matches emoji by suffix text only
function patchTdRegex(html, textSuffix, key) {
  // Match: <td> followed by any emoji-like chars then the text suffix, </td>
  const re = new RegExp(
    "<td>([^<]*?" +
      textSuffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
      ")<\\/td>",
  );
  if (!re.test(html)) {
    console.error("NOT FOUND: *" + textSuffix);
    return html;
  }
  return html.replace(
    re,
    (match, inner) => `<td data-i18n="${key}">${inner}</td>`,
  );
}

// ─── Fix age.html: Explorers ───────────────────────────────────────────────
let ageHtml = fs.readFileSync(path.join(root, "guide/age.html"), "utf8");
ageHtml = patchTdRegex(ageHtml, " Explorers", "age_group_explorers");
fs.writeFileSync(path.join(root, "guide/age.html"), ageHtml, "utf8");
console.log("age.html Explorers fixed");

// ─── Fix practice.html: all op cells ─────────────────────────────────────
let pHtml = fs.readFileSync(path.join(root, "guide/practice.html"), "utf8");
pHtml = patchTdRegex(pHtml, " Addition", "practice_op_add");
pHtml = patchTdRegex(pHtml, " Subtraction", "practice_op_sub");
pHtml = patchTdRegex(pHtml, " Multiplication", "practice_op_mul");
pHtml = patchTdRegex(pHtml, " Division", "practice_op_div");
pHtml = patchTdRegex(pHtml, " Triple ops", "practice_op_triple");
pHtml = patchTdRegex(pHtml, " Compound ops", "practice_op_compound");
fs.writeFileSync(path.join(root, "guide/practice.html"), pHtml, "utf8");
console.log("practice.html ops fixed");

const fs = require("fs");
const path = require("path");
const root = "c:/Users/bismayilov/Documents/projects/biemtech";

const gi18n = fs.readFileSync(path.join(root, "guide-i18n.js"), "utf8");
const i18n = fs.readFileSync(path.join(root, "i18n.js"), "utf8");
const combined = gi18n + i18n;

const htmlFiles = [
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

const missing = new Set();
const re = /data-i18n="([^"]+)"/g;
for (const f of htmlFiles) {
  const html = fs.readFileSync(path.join(root, f), "utf8");
  let m;
  while ((m = re.exec(html)) !== null) {
    const key = m[1];
    if (
      !combined.includes(key + '"') &&
      !combined.includes("'" + key + "'") &&
      !combined.includes(key + ":")
    ) {
      missing.add(key + " (" + f + ")");
    }
  }
}
if (missing.size === 0) {
  console.log("ALL KEYS FOUND - translation is complete!");
} else {
  console.log("MISSING KEYS (" + missing.size + "):");
  [...missing].sort().forEach((x) => console.log("  " + x));
}

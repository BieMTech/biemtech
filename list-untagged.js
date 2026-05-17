const fs = require("fs");
const path = require("path");
const dir = "c:/Users/bismayilov/Documents/projects/biemtech/guide";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));

for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), "utf8");
  const html = raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "");
  const re = /<(h[1-6]|p|li)\b([^>]*?)>([\s\S]*?)<\/\1>/g;
  let m,
    found = [];
  while ((m = re.exec(html)) !== null) {
    const attrs = m[2];
    const inner = m[3].replace(/<[^>]+>/g, "").trim();
    if (attrs.includes("data-i18n")) continue;
    if (!inner || inner.length < 5) continue;
    if (/^[\d\s\W]+$/.test(inner)) continue;
    if (inner.includes("http")) continue;
    const cls = (attrs.match(/class="([^"]+)"/) || ["", ""])[1];
    found.push(
      "  <" +
        m[1] +
        (cls ? " ." + cls : "") +
        ">: " +
        inner.replace(/\s+/g, " ").substring(0, 100),
    );
  }
  if (found.length) {
    console.log("\n=== " + f + " (" + found.length + " untagged) ===");
    found.forEach((l) => console.log(l));
  }
}

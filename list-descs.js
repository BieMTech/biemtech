const fs = require("fs");
const files = [
  "home",
  "speed",
  "mixed",
  "battle",
  "result",
  "statistics",
  "shop",
  "settings",
  "parent",
];
for (const f of files) {
  const html = fs.readFileSync(
    "c:/Users/bismayilov/Documents/projects/biemtech/guide/" + f + ".html",
    "utf8",
  );
  const re = /<p class="feature-card__desc">([\s\S]*?)<\/p>/g;
  let m,
    i = 1;
  while ((m = re.exec(html)) !== null) {
    const text = m[1]
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    console.log(f + "[" + i + "]: " + text.substring(0, 80));
    i++;
  }
  console.log("");
}

const fs = require("fs");
const pages = [
  "index",
  "theme",
  "age",
  "home",
  "daily",
  "practice",
  "speed",
  "mixed",
  "mistakes",
  "battle",
  "result",
  "statistics",
  "profile",
  "shop",
  "settings",
  "parent",
];
for (const p of pages) {
  const html = fs.readFileSync(
    "c:/Users/bismayilov/Documents/projects/biemtech/guide/" + p + ".html",
    "utf8",
  );
  const m = html.match(/<span class="breadcrumb__current">([^<]+)<\/span>/);
  console.log(p + ":", m ? '"' + m[1].trim() + '"' : "NOT FOUND");
}

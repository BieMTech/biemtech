const c = require("fs").readFileSync(
  "c:/Users/bismayilov/Documents/projects/biemtech/guide-i18n.js",
  "utf8",
);
const keys = [
  "home_score_desc",
  "home_mp_desc",
  "home_welcome_desc",
  "home_login_desc",
  "home_best_desc",
  "home_streak_desc",
];
for (const k of keys) {
  const re = new RegExp(k + ':"([^"]{0,100})');
  const m = c.match(re);
  console.log(k + ":", m ? m[1] : "NOT FOUND");
}

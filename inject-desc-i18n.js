// Adds data-i18n attributes to feature-card__desc elements in order
const fs = require("fs");
const path = require("path");
const root = "c:/Users/bismayilov/Documents/projects/biemtech";

const fileKeys = {
  "guide/home.html": [
    "home_rank_desc",
    "home_xp_desc",
    "home_player_desc",
    "home_avatar_desc",
    "home_score_desc",
    "home_streak_desc",
    "home_best_desc",
    "home_coins_desc",
    "home_daily_desc",
    "home_practice_desc",
    "home_speed_desc",
    "home_mixed_desc",
    "home_battle_desc",
    "home_mp_desc",
    "home_welcome_desc",
    "home_login_desc",
  ],
  "guide/speed.html": [
    "speed_20s_desc",
    "speed_30s_desc",
    "speed_40s_desc",
    "speed_60s_desc",
  ],
  "guide/mixed.html": [
    "mixed_sharp_desc",
    "mixed_warmup_desc",
    "mixed_mastery_desc",
    "mixed_spots_desc",
  ],
  "guide/battle.html": [
    "battle_winner_desc",
    "battle_cards_desc",
    "battle_review_desc",
    "battle_again_desc",
  ],
  "guide/result.html": [
    "result_score_desc",
    "result_acc_desc",
    "result_time_desc",
    "result_cw_desc",
    "result_claim_desc",
    "result_used_desc",
    "result_na_desc",
    "result_loading_desc",
  ],
  "guide/statistics.html": [
    "stats_green_desc",
    "stats_orange_desc",
    "stats_red_desc",
    "stats_heat0_desc",
    "stats_heat1_desc",
    "stats_heat2_desc",
    "stats_heat3_desc",
  ],
  "guide/shop.html": [
    "shop_ad_avail_desc",
    "shop_ad_limit_desc",
    "shop_free_desc",
    "shop_buy_desc",
    "shop_locked_desc",
    "shop_equip_desc",
  ],
  "guide/settings.html": [
    "settings_sfx_desc",
    "settings_vib_desc",
    "settings_lang1_desc",
    "settings_lang2_desc",
    "settings_lang3_desc",
    "settings_lang4_desc",
  ],
  "guide/parent.html": [
    "parent_stats_desc",
    "parent_daily_desc",
    "parent_streak_desc",
    "parent_age_desc",
    "parent_limit_desc",
    "parent_usage_desc",
  ],
};

const OLD_OPEN = '<p class="feature-card__desc">';
const NEW_OPEN_TPL = (key) =>
  `<p class="feature-card__desc" data-i18n="${key}">`;

for (const [relPath, keys] of Object.entries(fileKeys)) {
  const filePath = path.join(root, relPath);
  let html = fs.readFileSync(filePath, "utf8");

  let keyIdx = 0;
  let result = "";
  let searchFrom = 0;

  while (keyIdx < keys.length) {
    const pos = html.indexOf(OLD_OPEN, searchFrom);
    if (pos === -1) {
      console.error(
        `ERROR: Not enough occurrences in ${relPath} (expected ${keys.length}, found ${keyIdx})`,
      );
      break;
    }
    result += html.slice(searchFrom, pos);
    result += NEW_OPEN_TPL(keys[keyIdx]);
    searchFrom = pos + OLD_OPEN.length;
    keyIdx++;
  }
  result += html.slice(searchFrom);

  // Verify no old unattributed descs remain
  const remaining = (result.match(/<p class="feature-card__desc">/g) || [])
    .length;
  if (remaining > 0) {
    console.warn(`WARNING: ${remaining} untagged desc(s) remain in ${relPath}`);
  }

  fs.writeFileSync(filePath, result, "utf8");
  console.log(
    `Done: ${relPath} (${keyIdx} keys applied, ${remaining} remaining)`,
  );
}

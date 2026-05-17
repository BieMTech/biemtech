const fs=require('fs');
let t=fs.readFileSync('guide-i18n.js','utf8');
function fix(k,o,n){
  var s=k+':\n        "'+o+'"';
  var r=k+':\n        "'+n+'"';
  if(t.indexOf(s)!==-1){t=t.split(s).join(r);return true;}
  // inline fallback
  var s2=k+': "'+o+'"';
  var r2=k+': "'+n+'"';
  if(t.indexOf(s2)!==-1){t=t.split(s2).join(r2);return true;}
  return false;
}
var ok=0,miss=0;
function chk(k,o,n){if(fix(k,o,n))ok++;else{console.warn('MISS:'+k+'|'+o.slice(0,40));miss++;}}
// guide_shop_sub
chk('guide_shop_sub','Oynad\u0131\u011f\u0131n\u0131z \u00fc\u00e7\u00fcn qazand\u0131\u011f\u0131n\u0131z sikk\u0259l\u0259rl\u0259 avatarlar v\u0259 fonlar a\u00e7\u0131n.','Oynad\u0131\u011f\u0131n\u0131z \u00fc\u00e7\u00fcn qazand\u0131\u011f\u0131n\u0131z sikk\u0259l\u0259rl\u0259 f\u0259rdi avatarlar v\u0259 fonlar a\u00e7\u0131n. Profilinizi f\u0259rdil\u0259\u015fdirin v\u0259 \u00f6z\u00fcn\u00fcz\u0259 xas edin.');
chk('guide_shop_sub','\u0422\u0440\u0430\u0442\u044c\u0442\u0435 \u043c\u043e\u043d\u0435\u0442\u044b \u043d\u0430 \u0430\u0432\u0430\u0442\u0430\u0440\u044b \u0438 \u0444\u043e\u043d\u044b, \u0447\u0442\u043e\u0431\u044b \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c.','\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0437\u0430\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u043d\u044b\u0435 \u043c\u043e\u043d\u0435\u0442\u044b, \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440\u044b \u0438 \u0444\u043e\u043d\u044b. \u041f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435 \u0441\u0432\u043e\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c \u0438 \u0441\u0434\u0435\u043b\u0430\u0439\u0442\u0435 \u0435\u0433\u043e \u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u043c.');
chk('guide_shop_sub','Kazand\u0131\u011f\u0131n\u0131z paralarla avatar ve arka planlar\u0131 a\u00e7\u0131n.','Oynarken kazand\u0131\u011f\u0131n\u0131z paralarla \u00f6zel avatarlar\u0131 ve arka planlar\u0131 a\u00e7\u0131n. Profilinizi ki\u015fisel le\u015ftirin ve kendinize \u00f6zg\u00fc yap\u0131n.');
chk('guide_shop_sub','Kaufen Sie Avatare und Hintergr\u00fcnde mit verdienten M\u00fcnzen.','Kaufen Sie Avatare und Hintergr\u00fcnde mit Ihren verdienten M\u00fcnzen. Personalisieren Sie Ihr Profil und gestalten Sie es nach Ihrem Geschmack.');
chk('guide_shop_sub','D\u00e9pensez vos pi\u00e8ces pour d\u00e9bloquer avatars et arri\u00e8re-plans.','Utilisez les pi\u00e8ces gagn\u00e9es pour d\u00e9bloquer des avatars et arri\u00e8re-plans personnalis\u00e9s. Personnalisez votre profil et faites-en le v\u00f4tre.');
chk('guide_shop_sub','Gasta monedas en avatares y fondos.','Usa las monedas que ganas jugando para desbloquear avatares y fondos personalizados. Personaliza tu perfil y h\u00e1zlo tuyo.');
chk('guide_shop_sub','Gaste moedas em avatares e fundos.','Use as moedas que voc\u00ea ganha jogando para desbloquear avatares e fundos personalizados. Personalize seu perfil e torne-o seu.');
chk('guide_shop_sub','Spendi monete per avatar e sfondi.','Usa le monete che guadagni giocando per sbloccare avatar e sfondi personalizzati. Personalizza il tuo profilo e rendilo tuo.');
chk('guide_shop_sub','\u0623\u0646\u0641\u0642 \u0639\u0645\u0644\u0627\u062a\u0643 \u0639\u0644\u0649 \u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0631\u0645\u0632\u064a\u0629 \u0648\u0627\u0644\u062e\u0644\u0641\u064a\u0627\u062a.','\u0627\u0633\u062a\u062e\u062f\u0645 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u0643\u0633\u0628\u0647\u0627 \u0645\u0646 \u0627\u0644\u0644\u0639\u0628 \u0644\u0641\u062a\u062d \u0623\u0641\u0627\u062a\u0627\u0631\u0627\u062a \u0648\u062e\u0644\u0641\u064a\u0627\u062a \u0645\u062e\u0635\u0635\u0629. \u062e\u0635\u0651\u0635 \u0645\u0644\u0641\u0643 \u0627\u0644\u0634\u062e\u0635\u064a \u0648\u0627\u062c\u0639\u0644\u0647 \u0641\u0631\u064a\u062f\u0627\u064b.');
chk('guide_shop_sub','\u7528\u91d1\u5e01\u89e3\u9501\u5934\u50cf\u548c\u80cc\u666f\u3002','\u7528\u6e38\u620f\u4e2d\u8d5a\u53d6\u7684\u91d1\u5e01\u89e3\u9501\u81ea\u5b9a\u4e49\u5934\u50cf\u548c\u80cc\u666f\u3002\u4e2a\u6027\u5316\u60a8\u7684\u4e2a\u4eba\u8d44\u6599\uff0c\u5c55\u73b0\u72ec\u7279\u98ce\u683c\u3002');
chk('guide_shop_sub','\u30b3\u30a4\u30f3\u3067\u30a2\u30d0\u30bf\u30fc\u3068\u80cc\u666f\u3092\u89e3\u9664\u3002','\u30d7\u30ec\u30a4\u3067\u7372\u5f97\u3057\u305f\u30b3\u30a4\u30f3\u3092\u4f7f\u3063\u3066\u30ab\u30b9\u30bf\u30e0\u30a2\u30d0\u30bf\u30fc\u3084\u80cc\u666f\u3092\u89e3\u9664\u3057\u307e\u3057\u3087\u3046\u3002\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u30d1\u30fc\u30bd\u30ca\u30e9\u30a4\u30ba\u3057\u3066\u3001\u81ea\u5206\u3060\u3051\u306e\u3082\u306e\u306b\u3057\u307e\u3057\u3087\u3046\u3002');
console.log('shop_sub done ok='+ok+' miss='+miss);
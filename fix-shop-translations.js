// fix-shop-translations.js
// Replaces truncated shop translations with complete, accurate versions.
const fs = require("fs");

// Each entry: [oldText, newText]
// All strings must exactly match what's currently in guide-i18n.js
const replacements = [
  // ── guide_shop_sub ──────────────────────────────────────────────────────────
  [
    `guide_shop_sub:"Oynadığınız üçün qazandığınız sikkələrlə avatarlar və fonlar açın."`,
    `guide_shop_sub:"Oynadığınız üçün qazandığınız sikkələrlə fərdi avatarlar və fonlar açın. Profilinizi fərdiləşdirin və özünüzə xas edin."`,
  ],
  [
    `guide_shop_sub:"Тратьте монеты на аватары и фоны, чтобы персонализировать профиль."`,
    `guide_shop_sub:"Используйте заработанные монеты, чтобы открыть аватары и фоны. Персонализируйте свой профиль и сделайте его уникальным."`,
  ],
  [
    `guide_shop_sub:"Kazandığınız paralarla avatar ve arka planları açın."`,
    `guide_shop_sub:"Oynarken kazandığınız paralarla özel avatarları ve arka planları açın. Profilinizi kişiselleştirin ve kendinize özgü yapın."`,
  ],
  [
    `guide_shop_sub:"Kaufen Sie Avatare und Hintergründe mit verdienten Münzen."`,
    `guide_shop_sub:"Kaufen Sie Avatare und Hintergründe mit Ihren verdienten Münzen. Personalisieren Sie Ihr Profil und gestalten Sie es nach Ihrem Geschmack."`,
  ],
  [
    `guide_shop_sub:"Dépensez vos pièces pour débloquer avatars et arrière-plans."`,
    `guide_shop_sub:"Utilisez les pièces gagnées pour débloquer des avatars et arrière-plans personnalisés. Personnalisez votre profil et faites-en le vôtre."`,
  ],
  [
    `guide_shop_sub:"Gasta monedas en avatares y fondos."`,
    `guide_shop_sub:"Usa las monedas que ganas jugando para desbloquear avatares y fondos personalizados. Personaliza tu perfil y hazlo tuyo."`,
  ],
  [
    `guide_shop_sub:"Gaste moedas em avatares e fundos."`,
    `guide_shop_sub:"Use as moedas que você ganha jogando para desbloquear avatares e fundos personalizados. Personalize seu perfil e torne-o seu."`,
  ],
  [
    `guide_shop_sub:"Spendi monete per avatar e sfondi."`,
    `guide_shop_sub:"Usa le monete che guadagni giocando per sbloccare avatar e sfondi personalizzati. Personalizza il tuo profilo e rendilo tuo."`,
  ],
  [
    `guide_shop_sub:"أنفق عملاتك على الصور الرمزية والخلفيات."`,
    `guide_shop_sub:"استخدم العملات التي تكسبها من اللعب لفتح أفاتارات وخلفيات مخصصة. خصّص ملفك الشخصي واجعله فريداً."`,
  ],
  [
    `guide_shop_sub:"用金币解锁头像和背景。"`,
    `guide_shop_sub:"用游戏中赚取的金币解锁自定义头像和背景。个性化您的个人资料，展现独特风格。"`,
  ],
  [
    `guide_shop_sub:"コインでアバターと背景を解除。"`,
    `guide_shop_sub:"プレイで獲得したコインを使ってカスタムアバターや背景を解除しましょう。プロフィールをパーソナライズして、自分だけのものにしましょう。"`,
  ],

  // ── shop_s1_p ───────────────────────────────────────────────────────────────
  [
    `shop_s1_p:"Cari sikkə toplamınız 💎 şəklində göstərilir."`,
    `shop_s1_p:"Cari sikkə toplamınız 💎 şəklində göstərilir. Hər düzgün cavab, seriya bonusu və mükafatlı reklamdan sikkə qazanırsınız."`,
  ],
  [
    `shop_s1_p:"Текущий баланс отображается как 💎."`,
    `shop_s1_p:"Текущий баланс монет отображается как 💎. Монеты зарабатываются за каждый правильный ответ, бонус серии и просмотр рекламы."`,
  ],
  [
    `shop_s1_p:"Bakiyeniz 💎 olarak gösterilir."`,
    `shop_s1_p:"Toplam para bakiyeniz 💎 olarak gösterilir. Her doğru cevap, seri bonusu ve ödüllü reklamdan para kazanılır."`,
  ],
  [
    `shop_s1_p:"Guthaben als 💎 angezeigt."`,
    `shop_s1_p:"Ihr Münzguthaben wird als 💎 angezeigt. Münzen werden für jede richtige Antwort, Serienbonus und belohnte Anzeige verdient."`,
  ],
  [
    `shop_s1_p:"Solde affiché comme 💎."`,
    `shop_s1_p:"Votre solde de pièces est affiché comme 💎. Les pièces sont gagnées pour chaque bonne réponse, bonus de série et publicité récompensée."`,
  ],
  [
    `shop_s1_p:"Saldo mostrado como 💎."`,
    `shop_s1_p:"Tu total de monedas se muestra como 💎. Las monedas se ganan con cada respuesta correcta, bono de racha y anuncio recompensado."`,
  ],
  // pt shop_s1_p is same text as es — find by nearby key context won't work.
  // We'll handle it via index-based logic below.
  [
    `shop_s1_p:"Saldo mostrato come 💎."`,
    `shop_s1_p:"Il totale delle monete è mostrato come 💎. Le monete si guadagnano per ogni risposta corretta, bonus serie e annuncio premiato."`,
  ],
  [
    `shop_s1_p:"يُعرض الرصيد كـ 💎."`,
    `shop_s1_p:"يُعرض إجمالي عملاتك كـ 💎. تُكسب العملات عن كل إجابة صحيحة وبونص تسلسل وإعلان مكافئ."`,
  ],
  [
    `shop_s1_p:"余额显示为💎。"`,
    `shop_s1_p:"您的金币总数显示为 💎。每次正确回答、连击奖励和奖励广告均可获得金币。"`,
  ],
  [
    `shop_s1_p:"残高は💎として表示。"`,
    `shop_s1_p:"コインの合計は 💎 として表示されます。正解するたびに、ストリークボーナスや報酬広告からコインが獲得されます。"`,
  ],

  // ── shop_s2_p ───────────────────────────────────────────────────────────────
  [
    `shop_s2_p:"Banner mükafatlı reklam təklif edir:"`,
    `shop_s2_p:"Banner mükafatlı video reklam təklif edir. İzləyərək bonus sikkə qazanın:"`,
  ],
  [
    `shop_s2_p:"Баннер предлагает видео с вознаграждением:"`,
    `shop_s2_p:"Баннер предлагает просмотр видеорекламы с вознаграждением. Посмотрите, чтобы заработать бонусные монеты:"`,
  ],
  [
    `shop_s2_p:"Banner ödüllü video reklamı sunar:"`,
    `shop_s2_p:"Banner ödüllü bir video reklamı sunar. İzleyerek bonus para kazanın:"`,
  ],
  [
    `shop_s2_p:"Banner bietet Bonus-Münzen:"`,
    `shop_s2_p:"Ein Banner bietet eine belohnte Videoanzeige an. Schauen Sie zu, um Bonusmünzen zu verdienen:"`,
  ],
  [
    `shop_s2_p:"Bannière de pub récompensée :"`,
    `shop_s2_p:"Une bannière propose une publicité vidéo récompensée. Regardez pour gagner des pièces bonus :"`,
  ],
  [
    `shop_s2_p:"Banner de anuncio recompensado:"`,
    `shop_s2_p:"Un banner ofrece un anuncio de video recompensado. Míralo para ganar monedas de bonificación:"`,
  ],
  [
    `shop_s2_p:"Banner de anúncio recompensado:"`,
    `shop_s2_p:"Um banner oferece um anúncio de vídeo recompensado. Assista para ganhar moedas bônus:"`,
  ],
  [
    `shop_s2_p:"Banner pubblicità ricompensato:"`,
    `shop_s2_p:"Un banner offre un annuncio video premiato. Guardalo per guadagnare monete bonus:"`,
  ],
  [
    `shop_s2_p:"لافتة الإعلان المكافئ:"`,
    `shop_s2_p:"يعرض البانر إعلاناً فيديو مكافئاً. شاهده لكسب عملات إضافية:"`,
  ],
  [
    `shop_s2_p:"奖励广告横幅："`,
    `shop_s2_p:"横幅提供奖励视频广告。观看即可获得额外金币："`,
  ],
  [
    `shop_s2_p:"報酬広告バナー："`,
    `shop_s2_p:"バナーに報酬付き動画広告が表示されます。視聴してボーナスコインを獲得しましょう："`,
  ],

  // ── shop_s3_p ───────────────────────────────────────────────────────────────
  [
    `shop_s3_p:"Bütün elementlər 2 sütunlu şəbəkədə göstərilir:"`,
    `shop_s3_p:"Bütün elementlər 2 sütunlu şəbəkədə göstərilir. Hər kartın status düyməsi var:"`,
  ],
  [
    `shop_s3_p:"Все предметы в сетке 2 колонки:"`,
    `shop_s3_p:"Все предметы отображаются в сетке из 2 колонок. На каждой карточке есть кнопка статуса:"`,
  ],
  [
    `shop_s3_p:"Tüm öğeler 2 sütunlu ızgarada:"`,
    `shop_s3_p:"Tüm öğeler 2 sütunlu ızgarada gösterilir. Her kartın bir durum düğmesi vardır:"`,
  ],
  [
    `shop_s3_p:"Alle Artikel im 2-Spalten-Raster:"`,
    `shop_s3_p:"Alle Artikel werden in einem 2-Spalten-Raster angezeigt. Jede Karte hat eine Statusschaltfläche:"`,
  ],
  [
    `shop_s3_p:"2 colonnes :"`,
    `shop_s3_p:"Les articles s'affichent dans une grille à 2 colonnes. Chaque carte possède un bouton de statut :"`,
  ],
  [
    `shop_s3_p:"2 columnas:"`,
    `shop_s3_p:"Los artículos se muestran en una cuadrícula de 2 columnas. Cada tarjeta tiene un botón de estado:"`,
  ],
  [
    `shop_s3_p:"2 colunas:"`,
    `shop_s3_p:"Os itens são exibidos em uma grade de 2 colunas. Cada cartão tem um botão de status:"`,
  ],
  [
    `shop_s3_p:"2 colonne:"`,
    `shop_s3_p:"Gli articoli sono visualizzati in una griglia a 2 colonne. Ogni scheda ha un pulsante di stato:"`,
  ],
  [
    `shop_s3_p:"عمودان:"`,
    `shop_s3_p:"تُعرض العناصر في شبكة من عمودين. تحتوي كل بطاقة على زر حالة:"`,
  ],
  [
    `shop_s3_p:"两列显示所有物品："`,
    `shop_s3_p:"物品显示在两列网格中。每张卡片都有一个状态按钮："`,
  ],
  [
    `shop_s3_p:"2列表示："`,
    `shop_s3_p:"アイテムは2列グリッドで表示されます。各カードにはステータスボタンがあります："`,
  ],

  // ── shop_free_desc ──────────────────────────────────────────────────────────
  [
    `shop_free_desc:"Hemen al ve tak."`,
    `shop_free_desc:"Almak için dokunun ve hemen takın."`,
  ],
  [
    `shop_free_desc:"Sofort einfordern."`,
    `shop_free_desc:"Tippen, um sofort einzufordern und auszustatten."`,
  ],
  [
    `shop_free_desc:"Réclamer immédiatement."`,
    `shop_free_desc:"Appuyez pour réclamer et équiper immédiatement."`,
  ],
  [
    `shop_free_desc:"Reclamar inmediatamente."`,
    `shop_free_desc:"Toca para reclamar y equipar de inmediato."`,
  ],
  [
    `shop_free_desc:"Resgatar imediatamente."`,
    `shop_free_desc:"Toque para reivindicar e equipar imediatamente."`,
  ],
  [
    `shop_free_desc:"Riscatta immediatamente."`,
    `shop_free_desc:"Tocca per riscattare e indossare subito."`,
  ],
  [
    `shop_free_desc:"استرداد فوري."`,
    `shop_free_desc:"اضغط للمطالبة والتجهيز فوراً."`,
  ],
  [`shop_free_desc:"立即领取。"`, `shop_free_desc:"点击立即领取并装备。"`],
  [
    `shop_free_desc:"すぐ入手。"`,
    `shop_free_desc:"タップしてすぐに入手・装備しましょう。"`,
  ],

  // ── shop_buy_desc ───────────────────────────────────────────────────────────
  [
    `shop_buy_desc:"Yeterli para var."`,
    `shop_buy_desc:"Yeterli paranız var. Satın almak için dokunun."`,
  ],
  [
    `shop_buy_desc:"Genug Guthaben."`,
    `shop_buy_desc:"Sie haben genug Münzen. Tippen Sie, um zu kaufen."`,
  ],
  [
    `shop_buy_desc:"Appuyer pour acheter."`,
    `shop_buy_desc:"Vous avez assez de pièces. Appuyez pour acheter."`,
  ],
  [
    `shop_buy_desc:"Toca para comprar."`,
    `shop_buy_desc:"Tienes suficientes monedas. Toca para comprar."`,
  ],
  [
    `shop_buy_desc:"Toque para comprar."`,
    `shop_buy_desc:"Você tem moedas suficientes. Toque para comprar."`,
  ],
  [
    `shop_buy_desc:"Tocca per acquistare."`,
    `shop_buy_desc:"Hai abbastanza monete. Tocca per acquistare."`,
  ],
  [
    `shop_buy_desc:"اضغط للشراء."`,
    `shop_buy_desc:"لديك ما يكفي من العملات. اضغط للشراء."`,
  ],
  [`shop_buy_desc:"点击购买。"`, `shop_buy_desc:"您有足够的金币。点击购买。"`],
  [
    `shop_buy_desc:"タップして購入。"`,
    `shop_buy_desc:"コインが十分あります。タップして購入しましょう。"`,
  ],

  // ── shop_locked_desc ────────────────────────────────────────────────────────
  [
    `shop_locked_desc:"Недостаточно средств."`,
    `shop_locked_desc:"Недостаточно средств. Играйте, чтобы заработать больше монет."`,
  ],
  [
    `shop_locked_desc:"Yetersiz bakiye."`,
    `shop_locked_desc:"Yetersiz bakiye. Oynayarak daha fazla para kazanın."`,
  ],
  [
    `shop_locked_desc:"Unzureichendes Guthaben."`,
    `shop_locked_desc:"Unzureichendes Guthaben. Verdienen Sie mehr Münzen durch Spielen."`,
  ],
  [
    `shop_locked_desc:"Solde insuffisant."`,
    `shop_locked_desc:"Solde insuffisant. Gagnez plus de pièces en jouant."`,
  ],
  [
    `shop_locked_desc:"Saldo insuficiente."`,
    `shop_locked_desc:"Saldo insuficiente. Gana más monedas jugando."`,
  ],
  // pt has same text "Saldo insuficiente." — handle with replaceAll count check below
  [
    `shop_locked_desc:"Saldo insufficiente."`,
    `shop_locked_desc:"Saldo insufficiente. Guadagna più monete giocando."`,
  ],
  [
    `shop_locked_desc:"رصيد غير كافٍ."`,
    `shop_locked_desc:"رصيد غير كافٍ. اكسب المزيد من العملات باللعب."`,
  ],
  [
    `shop_locked_desc:"余额不足。"`,
    `shop_locked_desc:"余额不足。通过游戏赚取更多金币。"`,
  ],
  [
    `shop_locked_desc:"残高不足。"`,
    `shop_locked_desc:"残高不足です。プレイしてコインを増やしましょう。"`,
  ],

  // ── shop_equip_desc ─────────────────────────────────────────────────────────
  [
    `shop_equip_desc:"Aktivieren."`,
    `shop_equip_desc:"Dieser Artikel gehört Ihnen. Tippen Sie, um ihn zu aktivieren."`,
  ],
  [
    `shop_equip_desc:"Activer."`,
    `shop_equip_desc:"Vous possédez cet article. Appuyez pour l'activer."`,
  ],
  [
    `shop_equip_desc:"Activar."`,
    `shop_equip_desc:"Posees este artículo. Toca para establecerlo como activo."`,
  ],
  [
    `shop_equip_desc:"Ativar."`,
    `shop_equip_desc:"Você possui este item. Toque para defini-lo como ativo."`,
  ],
  [
    `shop_equip_desc:"Attiva."`,
    `shop_equip_desc:"Possiedi questo articolo. Tocca per impostarlo come attivo."`,
  ],
  [
    `shop_equip_desc:"تفعيل."`,
    `shop_equip_desc:"أنت تمتلك هذا العنصر. اضغط لتعيينه كنشط."`,
  ],
  [
    `shop_equip_desc:"激活。"`,
    `shop_equip_desc:"您拥有此物品。点击将其设为活跃。"`,
  ],
  [
    `shop_equip_desc:"アクティベート。"`,
    `shop_equip_desc:"このアイテムを所有しています。タップしてアクティブに設定しましょう。"`,
  ],
];

let content = fs.readFileSync("guide-i18n.js", "utf8");
let fixedCount = 0;
let notFoundCount = 0;

// Special case: ES and PT share same text for shop_s1_p and shop_locked_desc.
// We need ordered replacement — replace the first occurrence for ES, second for PT.
// Handle shop_s1_p ES/PT pair
const s1pShared = `shop_s1_p:"Saldo mostrado como 💎."`;
const s1pES = `shop_s1_p:"Tu total de monedas se muestra como 💎. Las monedas se ganan con cada respuesta correcta, bono de racha y anuncio recompensado."`;
const s1pPT = `shop_s1_p:"O seu total de moedas é mostrado como 💎. As moedas são ganhas a cada resposta correta, bônus de sequência e anúncio recompensado."`;
const s1pCount = content.split(s1pShared).length - 1;
if (s1pCount === 2) {
  content = content.replace(s1pShared, s1pES);
  content = content.replace(s1pShared, s1pPT);
  fixedCount += 2;
  console.log("Fixed shop_s1_p ES+PT (shared text)");
} else {
  console.warn(
    "WARNING: Expected 2 occurrences of shared shop_s1_p, found: " + s1pCount,
  );
}

// Special case: ES and PT share same text for shop_locked_desc
const lockedShared = `shop_locked_desc:"Saldo insuficiente."`;
const lockedES = `shop_locked_desc:"Saldo insuficiente. Gana más monedas jugando."`;
const lockedPT = `shop_locked_desc:"Saldo insuficiente. Ganhe mais moedas jogando."`;
const lockedCount = content.split(lockedShared).length - 1;
if (lockedCount === 2) {
  content = content.replace(lockedShared, lockedES);
  content = content.replace(lockedShared, lockedPT);
  fixedCount += 2;
  console.log("Fixed shop_locked_desc ES+PT (shared text)");
} else {
  console.warn(
    "WARNING: Expected 2 occurrences of shared shop_locked_desc, found: " +
      lockedCount,
  );
}

// Process all other replacements
for (const [oldText, newText] of replacements) {
  if (!content.includes(oldText)) {
    console.warn("NOT FOUND: " + oldText.substring(0, 60));
    notFoundCount++;
    continue;
  }
  content = content.replace(oldText, newText);
  fixedCount++;
}

fs.writeFileSync("guide-i18n.js", content, "utf8");
console.log(`\nDone. Fixed: ${fixedCount}, Not found: ${notFoundCount}`);

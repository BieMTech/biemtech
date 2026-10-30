const NOTIK_COPY = {
  en: {
    about: "About", apps: "Apps", privacy: "Privacy", status: "● In Development", statusPlain: "In Development",
    tagline: "A little space for every idea.",
    description: "Capture a thought, make a checklist, sketch an idea, or record a voice note. Keep everything organized with categories, colors, and reminders in a personal notebook on your device.",
    updates: "Contact us for updates →", policy: "Privacy Policy",
    availability: "Notik is in development. Public availability and features may change before release.",
    previewTitle: "Small notes. Bright ideas.", previewBody: "Your thoughts, plans, and little reminders, together in one place.",
    strip1: "Notes & checklists", strip2: "Drawings & voice notes", strip3: "Local reminders", strip4: "No account required",
    features: "Features", featuresTitle: "Make room for your everyday ideas",
    f1Title: "Write it your way", f1Body: "Create rich-text notes and checklists. Organize them with categories, tags, colors, pins, and archive.",
    f2Title: "Go beyond text", f2Body: "Attach chosen photos, draw on a canvas, import audio, or record a voice note when you want to capture more.",
    f3Title: "Remember what matters", f3Body: "Set one-time or repeating reminders and use the calendar to see what is coming up.",
    f4Title: "Keep your own copies", f4Body: "Export notes as PDF or text, share through apps you choose, and export or restore a local JSON backup.",
    developer: "Developer", platform: "Platform", statusLabel: "Status", package: "Package", contact: "Contact", home: "Home"
  },
  az: {
    about: "Haqqımızda", apps: "Tətbiqlər", privacy: "Məxfilik", status: "● Hazırlanır", statusPlain: "Hazırlanır",
    tagline: "Hər fikir üçün kiçik bir yer.",
    description: "Fikrinizi yazın, siyahı yaradın, rəsm çəkin və ya səsli qeyd edin. Kateqoriyalar, rənglər və xatırlatmalarla hər şeyi cihazınızdakı şəxsi dəftərinizdə nizamlayın.",
    updates: "Yeniliklər üçün əlaqə saxlayın →", policy: "Məxfilik siyasəti",
    availability: "Notik hazırlanma mərhələsindədir. İctimai buraxılışa qədər əlçatanlıq və funksiyalar dəyişə bilər.",
    previewTitle: "Kiçik qeydlər. Parlaq fikirlər.", previewBody: "Fikirləriniz, planlarınız və kiçik xatırlatmalarınız bir yerdə.",
    strip1: "Qeydlər və siyahılar", strip2: "Rəsmlər və səsli qeydlər", strip3: "Yerli xatırlatmalar", strip4: "Hesab tələb olunmur",
    features: "Xüsusiyyətlər", featuresTitle: "Gündəlik fikirlərinizə yer ayırın",
    f1Title: "İstədiyiniz kimi yazın", f1Body: "Formatlanmış qeydlər və siyahılar yaradın. Kateqoriyalar, etiketlər, rənglər, bərkitmə və arxivlə onları nizamlayın.",
    f2Title: "Mətnlə kifayətlənməyin", f2Body: "Seçdiyiniz şəkilləri əlavə edin, rəsm çəkin, səs faylı daxil edin və ya səsli qeyd yazın.",
    f3Title: "Vacib olanı xatırlayın", f3Body: "Birdəfəlik və ya təkrarlanan xatırlatmalar qurun, qarşıdakı planları təqvimdə görün.",
    f4Title: "Öz nüsxələrinizi saxlayın", f4Body: "Qeydləri PDF və ya mətn kimi ixrac edin, seçdiyiniz tətbiqlərlə paylaşın, yerli JSON ehtiyat nüsxəsi yaradın və ya bərpa edin.",
    developer: "Tərtibatçı", platform: "Platforma", statusLabel: "Status", package: "Paket", contact: "Əlaqə", home: "Ana səhifə"
  }
};

(() => {
  const select = document.getElementById("lang-select");
  let saved = (navigator.language || "en").slice(0, 2);
  try { saved = localStorage.getItem("site_lang") || saved; } catch (_) {}
  function setLanguage(lang, persist = false) {
    const selected = NOTIK_COPY[lang] ? lang : "en";
    document.documentElement.lang = selected;
    document.documentElement.dir = "ltr";
    select.value = selected;
    document.querySelectorAll("[data-copy]").forEach(el => {
      el.textContent = NOTIK_COPY[selected][el.dataset.copy];
    });
    if (persist) { try { localStorage.setItem("site_lang", selected); } catch (_) {} }
  }
  setLanguage(saved);
  select.addEventListener("change", event => setLanguage(event.target.value, true));
})();

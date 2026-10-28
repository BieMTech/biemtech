/* The app and its privacy page share the site's saved EN/AZ preference. */
(() => {
  const copy = {
    en: {
      about: "About", apps: "Apps", privacy: "Privacy", policy: "Privacy Policy", home: "Home",
      status: "● In Development", tagline: "Prepare with purpose. Teach with confidence.",
      description: "Prepare for the curriculum, methodology, and pedagogy sections of MİQ and teacher certification exams. Practise by topic, read explanations with source references, take timed tests, and follow your progress in your account.",
      updates: "Contact us for updates →",
      independent: "An independent preparation tool by BieMTech. It is not affiliated with an official examination body. Practice sets cover the curriculum component and do not represent the complete official exam.",
      subjects: "Curriculum · Methodology · Pedagogy", exams: "MİQ & Teacher Certification",
      strip1: "Topic-based practice", strip2: "Timed tests", strip3: "Explanations and sources", strip4: "Personal progress",
      features: "Features", featuresTitle: "Build a steady preparation habit",
      f1Title: "Practise by topic", f1Body: "Choose topics across five sections. Get an explanation and a source reference after each practice answer.",
      f2Title: "Test your preparation", f2Body: "Take timed topic and general tests, plus dedicated MİQ and certification preparation sets. Review your results by topic.",
      f3Title: "Learn from mistakes", f3Body: "Revisit incorrect answers, save useful questions, and browse the question library with explanations.",
      f4Title: "See your progress", f4Body: "Track daily goals, study streaks, accuracy, and test history. Adjust the theme and text size for comfortable reading.",
      developer: "Developer", platform: "Platforms", platformValue: "Web / PWA, Android and iOS in development",
      language: "App language", account: "Account", accountValue: "Required to save progress", contact: "Contact",
      deletion: "Account deletion", back: "← All privacy policies", appPage: "Kurikulum Dəftəri app page",
      meta: "Effective date: October 28, 2026 · Developer: BieMTech · App ID: com.biemtech.kurikulum",
      summary: "Kurikulum Dəftəri uses an account to save your practice answers, test results, and progress on our server. Appearance settings stay on your device. You can delete your account from your profile or request deletion by email.",
      deletionTitle: "Delete your account and data",
      deletionSteps: "In the app or web version, open Profil → Hesabı sil, enter your current password, and confirm with Həmişəlik sil. This permanently removes your account and the linked records listed below.",
      deletionEmail: "You can also request deletion without installing the app. Email info@biemtech.com from your registered address with the subject “Kurikulum Dəftəri — account deletion”. We may verify account ownership before acting. Never email your password.",
      deletionAction: "Request account deletion by email →",
      deletionData: "Deletion removes your profile, password hash, sign-in sessions, practice and test history, answers, mistakes, bookmarks and notes, daily activity, question reports, and subscription records from the active application database. Signing out or uninstalling the app does not delete your server account. Local preferences can be cleared through your browser or device settings. See “Retention” below for separate logs and correspondence."
    },
    az: {
      about: "Haqqımızda", apps: "Tətbiqlər", privacy: "Məxfilik", policy: "Məxfilik siyasəti", home: "Ana səhifə",
      status: "● Hazırlanır", tagline: "Məqsədli hazırlaş. İnamla dərs keç.",
      description: "MİQ və müəllimlərin sertifikasiya imtahanlarının kurikulum, metodika və pedaqogika hissəsinə hazırlaşın. Mövzular üzrə məşq edin, mənbəli izahları oxuyun, vaxtlı sınaqlardan keçin və irəliləyişinizi hesabınızda izləyin.",
      updates: "Yeniliklər üçün bizə yazın →",
      independent: "BieMTech-in müstəqil hazırlıq tətbiqidir. Rəsmi imtahan qurumu ilə əlaqəli deyil. Hazırlıq dəstləri kurikulum hissəsini əhatə edir və tam rəsmi imtahanı təmsil etmir.",
      subjects: "Kurikulum · Metodika · Pedaqogika", exams: "MİQ və Sertifikasiya",
      strip1: "Mövzular üzrə məşq", strip2: "Vaxtlı sınaqlar", strip3: "İzahlar və mənbələr", strip4: "Fərdi irəliləyiş",
      features: "İmkanlar", featuresTitle: "Hazırlığı gündəlik vərdişə çevirin",
      f1Title: "Mövzular üzrə məşq", f1Body: "Beş bölmə daxilində mövzuları seçin. Hər məşq cavabından sonra izahı və mənbəyə istinadı oxuyun.",
      f2Title: "Biliklərinizi yoxlayın", f2Body: "Mövzu və ümumi sınaqlardan, ayrıca MİQ və sertifikasiya hazırlıq dəstlərindən vaxtla keçin. Nəticələri mövzular üzrə təhlil edin.",
      f3Title: "Səhvlərdən öyrənin", f3Body: "Səhv cavabları yenidən işləyin, faydalı sualları seçilmişlərə əlavə edin və izahlı sual kitabçasını nəzərdən keçirin.",
      f4Title: "İrəliləyişinizi görün", f4Body: "Gündəlik hədəfi, ardıcıl hazırlıq günlərini, dəqiqliyi və sınaq tarixçəsini izləyin. Rahat oxumaq üçün temanı və yazı ölçüsünü dəyişin.",
      developer: "Tərtibatçı", platform: "Platformalar", platformValue: "Veb / PWA, Android və iOS hazırlanır",
      language: "Tətbiqin dili", account: "Hesab", accountValue: "İrəliləyişi saxlamaq üçün tələb olunur", contact: "Əlaqə",
      deletion: "Hesabın silinməsi", back: "← Bütün məxfilik siyasətləri", appPage: "Kurikulum Dəftəri tətbiq səhifəsi",
      meta: "Qüvvəyə minmə tarixi: 28 oktyabr 2026 · Tərtibatçı: BieMTech · Tətbiq ID-si: com.biemtech.kurikulum",
      summary: "Kurikulum Dəftəri məşq cavablarınızı, sınaq nəticələrinizi və irəliləyişinizi serverimizdə saxlamaq üçün hesabdan istifadə edir. Görünüş ayarları cihazınızda qalır. Hesabınızı profildən silə və ya e-poçtla silinmə istəyə bilərsiniz.",
      deletionTitle: "Hesabınızı və məlumatlarınızı silin",
      deletionSteps: "Tətbiqdə və ya veb versiyada Profil → Hesabı sil bölməsini açın, cari şifrənizi daxil edin və Həmişəlik sil düyməsi ilə təsdiqləyin. Bu, hesabınızı və aşağıda göstərilən əlaqəli qeydləri həmişəlik silir.",
      deletionEmail: "Tətbiqi quraşdırmadan da silinmə istəyə bilərsiniz. Qeydiyyat ünvanınızdan info@biemtech.com ünvanına “Kurikulum Dəftəri — hesabın silinməsi” mövzusu ilə yazın. Əməliyyatdan əvvəl hesabın sizə məxsusluğunu yoxlaya bilərik. Şifrənizi heç vaxt e-poçtla göndərməyin.",
      deletionAction: "E-poçtla hesabın silinməsini istəyin →",
      deletionData: "Silinmə profilinizi, şifrə heşini, giriş sessiyalarını, məşq və sınaq tarixçəsini, cavabları, səhvləri, seçilmiş sualları və qeydləri, gündəlik fəaliyyəti, sual şikayətlərini və abunəlik qeydlərini tətbiqin aktiv bazasından silir. Hesabdan çıxmaq və ya tətbiqi silmək server hesabınızı silmir. Yerli seçimləri brauzer və ya cihaz ayarlarından təmizləyə bilərsiniz. Ayrı jurnallar və yazışmalar üçün aşağıdakı “Saxlanma müddəti” bölməsinə baxın."
    }
  };
  const select = document.getElementById("lang-select");
  function render(lang, persist = false) {
    const chosen = lang === "az" ? "az" : "en";
    document.documentElement.lang = chosen;
    select.value = chosen;
    document.querySelectorAll("[data-kd]").forEach(element => {
      const value = copy[chosen][element.dataset.kd];
      if (value !== undefined) element.textContent = value;
    });
    document.querySelectorAll("[data-policy-lang]").forEach(element => {
      element.hidden = element.dataset.policyLang !== chosen;
    });
    const emailLink = document.getElementById("deletion-email");
    if (emailLink) {
      const subject = chosen === "az" ? "Kurikulum Dəftəri — hesabın silinməsi" : "Kurikulum Dəftəri — account deletion";
      emailLink.href = "mailto:info@biemtech.com?subject=" + encodeURIComponent(subject);
    }
    if (persist) { try { localStorage.setItem("site_lang", chosen); } catch (_) {} }
  }
  let saved = "en";
  try { saved = localStorage.getItem("site_lang") || "en"; } catch (_) {}
  render(saved);
  select.addEventListener("change", event => render(event.target.value, true));
})();

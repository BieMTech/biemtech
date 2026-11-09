const policyLanguage = document.getElementById("policy-language");
const policyEnglish = document.getElementById("policy-en");
const policyAzerbaijani = document.getElementById("policy-az");

function showPolicy(language) {
  const useAzerbaijani = language === "az";
  document.documentElement.lang = policyLanguage.value = useAzerbaijani ? "az" : "en";
  policyEnglish.hidden = useAzerbaijani;
  policyAzerbaijani.hidden = !useAzerbaijani;
  document.title = (useAzerbaijani ? policyAzerbaijani : policyEnglish).querySelector("h1").textContent + " — BieMTech";
}

let language;
try { language = localStorage.getItem("site_lang") || localStorage.getItem("biemtech-lang"); } catch (_) {}
showPolicy(language || (navigator.language || "en").slice(0, 2).toLowerCase());
policyLanguage.addEventListener("change", () => showPolicy(policyLanguage.value));

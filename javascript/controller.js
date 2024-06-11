import * as info from "./info.js";
import views from "./views.js";

const nameLogo = "git-merge";
const paddingRight = "5px";
let language = "eng";

const changeLanguge = function (lang) {
  language = lang;
};

const displayInfo = function (drug) {
  const targetDrug = info.drugs[drug];

  const indexDrug = [
    drug.toUpperCase(),
    targetDrug.generic,
    targetDrug.indication[language],
    targetDrug.regimen[language],
    targetDrug.additional[language],
  ];
  const indexLanguage = info.terms[language];

  const markup = views.generateInfoMarkup(indexDrug, indexLanguage);

  views.showInfoPg(markup);
};

const closeInfo = function () {
  views.exitInfoPg();
};

const init = function () {
  views.handlerShowMenu();
  views.handlerCloseMenu();
  views.handlerChangeLanguage(changeLanguge);
  views.handlerDisplayInfoPg(displayInfo);
  views.handlerExitInfoPg(closeInfo);
};

init();

// Reveal Sections
const revealSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});
const allSections = document.querySelectorAll(".section");

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Adjust Logo
const brandLogos = document.querySelectorAll(".brand-icon");

brandLogos.forEach((logo) => {
  logo.setAttribute("name", nameLogo);
  logo.style.paddingRight = paddingRight;
});

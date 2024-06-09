class Views {
  _menu = document.querySelector(".home__menu");
  _drugFigures = document.querySelectorAll(".dose__grid--figure");
  _infoPg = document.getElementById("info");
  _infoPgContainer = document.querySelector(".info__container");

  _btnOpenMenu = document.querySelector(".home__nav--menu");
  _btnCloseMenu = document.querySelector(".home__menu--exit--icon");
  _linksMenu = document.querySelectorAll(".home__menu--list--link");
  _btnEng = document.querySelector(".dose__languages--btn--eng");
  _btnBm = document.querySelector(".dose__languages--btn--bm");

  _exitBtnInfo = document.querySelector(".info__exit--icon");

  showMenu() {
    this._menu.style.transform = "translateX(0)";
  }
  closeMenu() {
    this._menu.style.transform = "translateX(100%)";
  }

  changeLanguage(language) {
    let curLanguage = language;
    let oppositePair;

    if (curLanguage === "eng") {
      oppositePair = "bm";
    } else {
      oppositePair = "eng";
    }

    document
      .querySelector(`.dose__languages--btn--${curLanguage}`)
      .classList.add("dose__languages--btn--active");
    document
      .querySelector(`.dose__languages--btn--${oppositePair}`)
      .classList.remove("dose__languages--btn--active");
  }

  findDrugName(target) {
    const drug = target.getAttribute("id");
    return drug;
  }

  generateInfoMarkup(drug, lang) {
    let markup = `<div class="info__row">
              <h3 class="info__row--title" id="title-trade-name">
                ${lang[0]}
              </h3>
              <h3 class="info__row--description" id="desc-trade-name">
                ${drug[0]}
              </h3>
            </div>
            <div class="info__row">
              <h3 class="info__row--title" id="title-generic-name">
              ${lang[1]}
              </h3>
              <h3 class="info__row--description" id="desc-generic-name">
                  ${drug[1]}
              </h3>
            </div>
            <div class="info__row">
              <h3 class="info__row--title" id="title-indication">
              ${lang[2]}
              </h3>
              <h3 class="info__row--description" id="desc-indication">
                 ${drug[2]}
              </h3>
            </div>
            <div class="info__row">
              <h3 class="info__row--title" id="title-regimen">${lang[3]}</h3>
              <h3 class="info__row--description" id="desc-regimen">
                  ${drug[3]}
              </h3>
            </div>
            <div class="info__row">
              <h3 class="info__row--title" id="title-additional-info">
              ${lang[4]}
              </h3>
              <h3 class="info__row--description" id="desc-additional-info">
                 ${drug[4]}
              </h3>
            </div>`;

    return markup;
  }

  exitInfoPg() {
    this._infoPg.style.display = "none";
    document.querySelector("html").style.overflow = "auto";
  }

  showInfoPg(markup) {
    this._infoPgContainer.innerHTML = "";
    this._infoPgContainer.insertAdjacentHTML("beforeend", markup);
    this._infoPg.style.display = "block";
    document.querySelector("html").style.overflow = "hidden";
  }

  handlerShowMenu() {
    this._btnOpenMenu.addEventListener("click", () => {
      this.showMenu();
    });
  }

  handlerCloseMenu() {
    const closeTriggers = [...this._linksMenu, this._btnCloseMenu];

    closeTriggers.forEach((trigger) =>
      trigger.addEventListener("click", (ev) => {
        this.closeMenu();
      })
    );
  }

  handlerChangeLanguage(handler) {
    const btnLanguages = [this._btnEng, this._btnBm];

    btnLanguages.forEach((btn) =>
      btn.addEventListener("click", (ev) => {
        const target = ev.target;
        const curLanguage = target.textContent.trim();

        if (target.classList.contains("dose__languages--btn--active")) return;

        this.changeLanguage(curLanguage.toLowerCase());
        handler(curLanguage.toLowerCase());
      })
    );
  }

  handlerDisplayInfoPg(handler) {
    this._drugFigures.forEach((figure) =>
      figure.addEventListener("click", (ev) => {
        const target = ev.target.closest(".dose__grid--figure");
        const drug = this.findDrugName(target);
        handler(drug);
      })
    );
  }

  handlerExitInfoPg(handler) {
    this._exitBtnInfo.addEventListener("click", handler);
  }
}

export default new Views();

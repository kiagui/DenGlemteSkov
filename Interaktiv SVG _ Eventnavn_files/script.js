console.log("script.js er forbundet!");

// Interaktiv SVG-side
const svgPlaceholder = document.querySelector(".svg-placeholder");

// ##################################################
// NYT AF CLAUDE – START
// Får feen til at flyve hen til det punkt, man vælger.
//   - Åbn Punkt 1/2/3 i "Udforsk eventet" -> feen flyver til den sten
//   - Klik på en sten i SVG'en -> det tilhørende punkt åbner, og feen flyver
// Virker sammen med:
//   - svg.html: id="fe", class="punkt", data-punkt="1/2/3"
//   - style.css: #fe (transition) og .punkt.is-active
// ##################################################
if (svgPlaceholder) {
  // Feen (gruppen med id="fe" i SVG'en)
  const fe = document.querySelector("#fe");

  // Punkterne i "Udforsk eventet" (<details> med data-punkt)
  const punkter = document.querySelectorAll(".accordion-item");

  // De grå sten i SVG'en (<ellipse> med data-punkt)
  const sten = document.querySelectorAll(".punkt");

  // Hvor langt feen skal flyttes for at stå på hver sten.
  // Tallene er målt fra hendes startplads (sten 1) i SVG'ens koordinater:
  //   sten 1: cx 57.39,  cy 145.09  -> ingen flytning
  //   sten 2: cx 616.96, cy 145.09  -> 616.96 - 57.39 = 559.57 til højre
  //   sten 3: cx 338.7,  cy 427.27  -> 281.31 til højre og 282.18 ned
  const positioner = {
    1: { x: 0, y: 0 },
    2: { x: 559.57, y: 0 },
    3: { x: 281.31, y: 282.18 },
  };

  // Flytter feen hen til et punkt (1, 2 eller 3)
  function flytFe(nummer) {
    const pos = positioner[nummer];
    fe.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

    // Marker den sten feen står på (styles i style.css)
    sten.forEach((s) => s.classList.toggle("is-active", s.dataset.punkt === nummer));
  }

  // 1) Når et punkt i "Udforsk eventet" åbnes -> feen flyver derhen
  punkter.forEach((punkt) => {
    punkt.addEventListener("toggle", () => {
      if (punkt.open) flytFe(punkt.dataset.punkt);
    });
  });

  // 2) Når man klikker på en sten i SVG'en -> åbn det tilhørende punkt
  //    (det udløser "toggle" ovenfor, så feen flyver også)
  sten.forEach((s) => {
    s.addEventListener("click", () => {
      document.querySelector(`.accordion-item[data-punkt="${s.dataset.punkt}"]`).open = true;
    });
  });

  // Start: feen står på punkt 1
  flytFe("1");
}
// ##################################################
// NYT AF CLAUDE – SLUT
// ##################################################

// Opsamlingsside
const opsamlingPlaceholder = document.querySelector(".opsamling-placeholder");

if (opsamlingPlaceholder) {
  const params = new URLSearchParams(window.location.search);
  // Eksempel: params.get("navn") henter værdien fra et formularfelt med name="navn".
}

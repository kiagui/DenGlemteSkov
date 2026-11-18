console.log("script.js er forbundet!");

// Interaktiv SVG-side
const svgPlaceholder = document.querySelector(".svg-placeholder");

if (svgPlaceholder) {
  // Feen (gruppen med id="fe" i SVG'en)
  const fe = document.querySelector("#fe");

  // Punkterne i "Udforsk eventet" (<details> med data-punkt)
  const punkter = document.querySelectorAll(".accordion-item");

  // De grå sten i SVG'en (<ellipse> med data-punkt)
  const sten = document.querySelectorAll(".punkt");

  // Hvor langt feen skal flyttes for at stå på hver sten.
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
    sten.forEach((s) =>
      s.classList.toggle("is-active", s.dataset.punkt === nummer),
    );
  }

  // Når et punkt i "Udforsk eventet" åbnes -> feen flyver derhen
  punkter.forEach((punkt) => {
    punkt.addEventListener("toggle", () => {
      if (punkt.open) flytFe(punkt.dataset.punkt);
    });
  });

  // Start: feen står på punkt 1
  flytFe("1");
}

// Opsamlingsside
const opsamlingPlaceholder = document.querySelector(".opsamling-placeholder");

// ##################################################
// NYT AF CLAUDE – START
// Viser brugerens svar fra form.html på opsamlingssiden.
//   - Formularen sender svarene i URL'en: opsamling.html?navn=Kia&billet=en-dag...
//   - params.get("navn") henter værdien fra feltet med name="navn"
// ##################################################
if (opsamlingPlaceholder) {
  const params = new URLSearchParams(window.location.search);

  // "Oversættelser" fra value (det der sendes) til pæn tekst
  const tekster = {
    "en-dag": "En dags billet",
    weekend: "Weekend billet",
    fredag: "Fredag",
    lordag: "Lørdag",
    sondag: "Søndag",
    "dato1-kl12": "Dato 1 kl. 12",
    "dato1-kl15": "Dato 1 kl. 15",
    "dato2-kl12": "Dato 2 kl. 12",
    "dato2-kl15": "Dato 2 kl. 15",
    "dato3-kl12": "Dato 3 kl. 12",
    "dato3-kl15": "Dato 3 kl. 15",
  };

  // Henter en værdi fra URL'en og gør den pæn. Returnerer null hvis feltet er tomt.
  function hent(name) {
    const value = params.get(name);
    if (!value) return null;
    return tekster[value] || value;
  }

  // Hvilke linjer der skal vises: [overskrift, værdi]
  const linjer = [
    ["Navn", hent("navn")],
    ["Email", hent("email")],
    // Alder fra dropdown'en - " år" sættes på, så der står fx "20-24 år"
    ["Alder", params.get("alder") ? params.get("alder") + " år" : null],
    ["Billet", hent("billet")],
    // Dagen vises kun, hvis man har valgt en dags billet
    ["Dag", params.get("billet") === "en-dag" ? hent("dag") : null],
    ["Potion workshop", hent("potion")],
    ["Workshop 2", hent("workshop2")],
    ["Workshop 3", hent("workshop3")],
  ];

  // Byg indholdet
  const overskrift = document.createElement("h2");
  overskrift.textContent = "Din tilmelding";
  opsamlingPlaceholder.append(overskrift);

  const liste = document.createElement("dl");
  linjer.forEach(([titel, vaerdi]) => {
    if (!vaerdi) return; // spring tomme felter over

    const dt = document.createElement("dt");
    dt.textContent = titel;
    const dd = document.createElement("dd");
    dd.textContent = vaerdi; // textContent = sikkert, brugerens tekst bliver ikke til HTML
    liste.append(dt, dd);
  });
  opsamlingPlaceholder.append(liste);
}

// Formular: "Fjern valg"-knap i hver workshop
//   - Radio-knapper kan ikke klikkes "af" igen, så knappen gør det for en
//   - Den fjerner kun valget i sin egen <fieldset> (de andre workshops røres ikke)
//   - type="button" i HTML'en gør, at knappen IKKE sender formularen

const fjernKnapper = document.querySelectorAll(".fjern-valg");

fjernKnapper.forEach((knap) => {
  knap.addEventListener("click", () => {
    // Find den fieldset, knappen ligger i
    const fieldset = knap.closest("fieldset");

    // Find den valgte radio-knap i den fieldset og fjern markeringen
    const valgt = fieldset.querySelector('input[type="radio"]:checked');
    if (valgt) valgt.checked = false;
  });
});

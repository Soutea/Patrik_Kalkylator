// variabler

var timArvode = document.getElementById("myRange1");
var antalTimmar = document.getElementById("myRange2");
var brutto = document.getElementById("myRange3");
var kostnad = document.getElementById("myRange4");
var utdelning = document.getElementById("myRange5");

var timArvodeSliderPreview = document.getElementById("timarvode-preview");
var antalTimmarSliderPreview = document.getElementById("antaltimmar-preview");
var bruttoSliderPreview = document.getElementById("brutto-preview");
var kostnadSliderPreview = document.getElementById("kostnad-preview");
var utdelningSliderPreview = document.getElementById("utdelning-preview");

var data = {
  // Inputs
  timArvode: 750,
  antalTimmar: 1750,
  brutto: 42000,
  kostnad: 5000,

  jobbskatt: 2500,

  bil1: 0,
  bil2: 0,
  pension: 0,
  rd: 0,

  utdelning: 273000,

  // Calculated values
  kommunal: 12390,
  arbetsgivar: 8996.4,
  nettoLon: 32110,
  total: 54374.2,
  skatt: 83547.11,
  nettoUtdelning: 218400,
  statligInkomstskatt: 0,

  // Output values
  omsattning: 1225000,
  personal: 700490.4,
  kostnader: 144750,
  vinst: 397759.6,
  utdelningsmojlighet: 273000,
  nettoManad: 50310,
  motsvarandeLon: 87105.14,
  overskott: 23212.49
};

// #region
var sliders = [
  { element: timArvode, start: 750, step: 5, min: 500, max: 1200 },
  { element: antalTimmar, start: 1750, step: 5, min: 0, max: 2500 },
  { element: brutto, start: 42000, step: 1000, min: 30000, max: 70000 },
  { element: kostnad, start: 5000, step: 100, min: 0, max: 15000 },
  { element: utdelning, start: 273000, step: 1000, min: 0, max: 273000 }
];

function initSlider(sliderConfig) {
  noUiSlider.create(sliderConfig.element, {
    start: [sliderConfig.start],
    step: sliderConfig.step,
    range: {
      min: [sliderConfig.min],
      max: [sliderConfig.max]
    }
  });
}

sliders.forEach(slider => {
  initSlider(slider);
});

// #endregion

//testa att JS kommunicerar
console.log("hello World!;");

// Värdet av timarvode
timArvode.noUiSlider.on("update", function(values, handle) {
  timArvodeSliderPreview.innerHTML = values[handle];
  data.timArvode = +values[handle];
  updateValues();
});

// Värdet på antal timmar
antalTimmar.noUiSlider.on("update", function(values, handle) {
  antalTimmarSliderPreview.innerHTML = values[handle];
  data.antalTimmar = +values[handle];
  updateValues();
});

// Värdet på bruttolön
brutto.noUiSlider.on("update", function(values, handle) {
  bruttoSliderPreview.innerHTML = values[handle];
  data.brutto = +values[handle];

  updateValues();
});

// Värdet på kostnaden
kostnad.noUiSlider.on("update", function(values, handle) {
  kostnadSliderPreview.innerHTML = values[handle];
  data.kostnad = +values[handle];
  updateValues();
});

// Värdet på utdelningen
utdelning.noUiSlider.on("update", function(values, handle) {
  utdelningSliderPreview.innerHTML = values[handle];
  data.utdelning = +values[handle];
});

function calculateUtdelningMax() {
  console.log(data.vinst - data.skatt > data.utdelningsmojlighet);
  if (data.vinst - data.skatt > data.utdelningsmojlighet) {
    console.log("case 1", data.utdelningsmojlighet);
    return data.utdelningsmojlighet;
  } else {
    console.log("case 2", data.vinst - data.skatt);
    return data.vinst - data.skatt;
  }
}

// Clickrutor
function handleRDChange(element) {
  data.rd = element.checked ? 0.1 : 0;
  updateValues();
}

function handleBilChange(element) {
  data.bil1 = element.checked ? 3500 : 0;
  data.bil2 = element.checked ? 4000 : 0;
  updateValues();
}

function handlePensionChange(element) {
  data.pension = element.checked ? 4000 : 0;
  updateValues();
}

//Uträkningar
function updateValues() {
  data.kommunal = data.brutto * 0.295;
  data.arbetsgivar = data.brutto * 0.3142 - data.rd * data.brutto;
  data.statligInkomstskatt = (data.brutto - 42000) * 0.25;
  data.nettoLon = data.brutto - data.kommunal + data.jobbskatt - data.statligInkomstskatt;
  data.total = data.brutto + data.arbetsgivar + data.bil1 * (0.3142 + 0.295) + data.pension * 0.3114;

  data.nettoUtdelning = data.utdelning - data.utdelning * 0.2;

  data.omsattning = data.timArvode * data.antalTimmar;
  data.personal = data.total * 12 + data.pension * 12;
  data.kostnader = data.kostnad * 12 + data.bil2 * 12 + 0.03 * data.omsattning;
  data.vinst = data.omsattning - data.personal - data.kostnader;
  data.skatt = data.vinst * 0.22;
  data.utdelningsmojlighet = data.brutto * 6 + data.bil1 * 6;
  data.nettoManad = data.nettoUtdelning / 12 + data.nettoLon;
  data.motsvarandeLon = (data.nettoManad - 32000) * 1.199 + data.nettoManad * 1.295;
  data.overskott = data.vinst - data.skatt - data.utdelning;

  updateView();
}

//Visa data i konsollen
console.log(data);
console.log(calculateUtdelningMax());

//Uppdatera vyn
function updateView() {
  updateDomElement("omsattning", data.omsattning);
  updateDomElement("personal", data.personal);
  updateDomElement("kostnader", data.kostnader);
  updateDomElement("vinst", data.vinst);
  updateDomElement("utdelningsmojlighet", data.utdelningsmojlighet);
  updateDomElement("nettoManad", data.nettoManad);
  updateDomElement("motsvarandeLon", data.motsvarandeLon);
  updateDomElement("overskott", data.overskott);

  utdelning.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: calculateUtdelningMax()
    }
  });
}

function updateDomElement(elementId, value) {
  document.getElementById(elementId).innerHTML = value;
}

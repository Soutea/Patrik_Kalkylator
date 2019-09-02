// variabler

var timArvode = document.getElementById("myRange1");
var antalTimmar = document.getElementById("myRange2");
var brutto = document.getElementById("myRange3");
var kostnad = document.getElementById("myRange4");

var timArvodeSliderPreview = document.getElementById("timarvode-preview");
var antalTimmarSliderPreview = document.getElementById("antaltimmar-preview");
var bruttoSliderPreview = document.getElementById("brutto-preview");
var kostnadSliderPreview = document.getElementById("kostnad-preview");

var arbetsgivarSpan = document.getElementById("arbetsgivar");
var kommunalSpan = document.getElementById("kommunal");
var jobbskattSpan = document.getElementById("jobbskatt");
var totallonSpan = document.getElementById("totallon");
var nettoSpan = document.getElementById("netto");

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

  // Calculated values
  kommunal: 12390,
  arbetsgivar: 8996.4,
  netto: 32110,
  total: 54374.2
};

// #region
var sliders = [
  { element: timArvode, start: 750, step: 5, min: 500, max: 1200 },
  { element: antalTimmar, start: 1750, step: 5, min: 0, max: 2500 },
  { element: brutto, start: 42000, step: 1000, min: 30000, max: 70000 },
  { element: kostnad, start: 5000, step: 5, min: 0, max: 15000 }
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

// Timarvode
timArvode.noUiSlider.on("update", function(values, handle) {
  timArvodeSliderPreview.innerHTML = values[handle];
  data.timArvode = +values[handle];
});

// Värdet på antal timmar
antalTimmar.noUiSlider.on("update", function(values, handle) {
  antalTimmarSliderPreview.innerHTML = values[handle];
  data.antalTimmar = +values[handle];
});

// Värdet på Bruttolön
brutto.noUiSlider.on("update", function(values, handle) {
  bruttoSliderPreview.innerHTML = values[handle];
  data.brutto = +values[handle];

  updateValues();
});

// Värdet på kostnaden
kostnad.noUiSlider.on("update", function(values, handle) {
  kostnadSliderPreview.innerHTML = values[handle];
  data.kostnad = +values[handle];
});

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
  //Not sure if right
  data.pension = element.checked ? 4000 : 0;
  updateValues();
}

function updateValues() {
  data.kommunal = data.brutto * 0.295;
  data.arbetsgivar = data.brutto * 0.3142 - data.rd * data.brutto;
  data.netto = data.brutto - data.kommunal + data.jobbskatt;
  data.total = data.brutto + data.arbetsgivar + data.bil1 * (0.3142 + 0.295) + data.pension * 0.3114;

  console.log(data);
}

function updateView() {}

// variabler

var timArvode = document.getElementById('myRange1');
var antalTimmar = document.getElementById('myRange2');
var brutto = document.getElementById('myRange3');
var kostnad = document.getElementById('myRange4');

var timArvodeSliderPreview = document.getElementById('timarvode-preview');
var antalTimmarSliderPreview = document.getElementById('antaltimmar-preview');
var bruttoSliderPreview = document.getElementById('brutto-preview');
var kostnadSliderPreview = document.getElementById('kostnad-preview');

var arbetsgivarSpan = document.getElementById('arbetsgivar');
var kommunalSpan = document.getElementById('kommunal');
var jobbskattSpan = document.getElementById('jobbskatt');

var rdValue = 0;
var bruttoValue = 42000;
var jobbskatt= 2500;

//testa att JS kommunicerar

console.log("hello World!;")

//sliders med previews

// Timarvode
noUiSlider.create(timArvode, {
  start: [750],
  step: 5,
  range: {
      'min': [500],
      'max': [1200]
  }
});
timArvode.noUiSlider.on('update', function (values, handle) {
    timArvodeSliderPreview.innerHTML = values[handle];
});

// Antal timmar
noUiSlider.create(antalTimmar, {
  start: [1750],
  step: 5,
  range: {
      'min': [0],
      'max': [2500]
  }
});
antalTimmar.noUiSlider.on('update', function (values, handle) {
  antalTimmarSliderPreview.innerHTML = values[handle];
});

// Bruttolön
noUiSlider.create(brutto, {
  start: [42000],
  step: 1000,
  range: {
      'min': [30000],
      'max': [70000]
  }
});
brutto.noUiSlider.on('update', function (values, handle) {
  bruttoSliderPreview.innerHTML = values[handle];
  bruttoValue = values[handle];

// Uträkning av Kommunalskatt från bruttolönen
displayKommunalChange(values[handle]);

// Uträkning av Arbetsgivaravgift från bruttolönen och RD-värdet
displayArbetsgivarChange(values[handle], rdValue ? rdValue : 0);
});

// Visa den fasta jobbskatteavdraget
displayJobbskatt(jobbskatt);


// Kostnader
noUiSlider.create(kostnad, {
  start: [5000],
  step: 5,
  range: {
      'min': [0],
      'max': [15000]
  }
});
kostnad.noUiSlider.on('update', function (values, handle) {
  kostnadSliderPreview.innerHTML = values[handle];
});

function handleRDChange(element) {
  rdValue = +element.value;
  displayArbetsgivarChange(bruttoValue, rdValue);
}

function displayKommunalChange(brutto) {
  kommunalSpan.innerHTML = brutto * 0.295;
}

function displayArbetsgivarChange(brutto, rd) {
  arbetsgivarSpan.innerHTML = (brutto * 0.3142) - (rd * brutto);
}

function displayJobbskatt(jobbskatt) {
  jobbskattSpan.innerHTML = jobbskatt;
}



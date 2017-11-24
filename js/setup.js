'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var FIRSTNAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS_LIST = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS_LIST = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function compareRandom() {
  return Math.random() - 0.5;
};

function getRandomArray(array, index) {
  array.sort(compareRandom);
  var resultArray = [];
  for (var i = 0; i <= index; i++) {
    resultArray.push(array[i]);
  }
  return resultArray;
};

var getWizardData = function () {
  var wizard = {
    name: getRandomArray(FIRSTNAMES_LIST, 0) + ' ' + getRandomArray(SURNAMES_LIST, 0),
	coatColor: getRandomArray(COAT_COLORS_LIST, 0)[0],
	eyesColor: getRandomArray(EYES_COLORS_LIST, 0)[0]
  }
  return wizard;
};

var fillWizardsData = function () {
  for (var i = 0; i <= 3; i++) {
    wizards[i] = getWizardData();
  }
  return wizards;
};

fillWizardsData();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  
  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');

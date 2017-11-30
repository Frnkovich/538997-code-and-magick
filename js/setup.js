'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var FIRSTNAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS_LIST = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS_LIST = ['black', 'red', 'blue', 'yellow', 'green'];
var MAX_WIZARD = 4;
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var getRandomArray = function (array, index) {
  var cloneArray = array.slice().sort(compareRandom);
  var resultArray = [];
  for (var i = 0; i < index; i++) {
    resultArray.push(cloneArray[i]);
  }
  return resultArray;
};

var getWizardData = function (firstName, sureName, coatColor, eyesColor) {
  return {
    name: firstName + ' ' + sureName,
    coatColor: coatColor,
    eyesColor: eyesColor
  };
};

var fillWizardsData = function () {
  var wizards = [];
  var firstNameList = getRandomArray(FIRSTNAMES_LIST, FIRSTNAMES_LIST.length);
  var sureNameList = getRandomArray(SURNAMES_LIST, SURNAMES_LIST.length);
  var coatColorList = getRandomArray(COAT_COLORS_LIST, COAT_COLORS_LIST.length);
  var eyesColorList = getRandomArray(EYES_COLORS_LIST, EYES_COLORS_LIST.length);
  for (var i = 0; i < MAX_WIZARD; i++) {
    wizards.push(getWizardData(firstNameList[i], sureNameList[i], coatColorList[i], eyesColorList[i]));
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  setup.querySelector('.setup-similar').classList.remove('hidden');
}

var renderAll = function () {
  var wizards = fillWizardsData();
  renderWizards(wizards);
}

renderAll();

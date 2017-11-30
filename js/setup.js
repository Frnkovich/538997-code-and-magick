'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var FIRSTNAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS_LIST = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS_LIST = ['black', 'red', 'blue', 'yellow', 'green'];
var MAX_WIZARD = 4;
var wizards = [];
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getWizardData = function () {
  return {
    name: FIRSTNAMES_LIST[getRandom(0, FIRSTNAMES_LIST.length - 1)] + ' ' + SURNAMES_LIST[getRandom(0, SURNAMES_LIST.length - 1)],
    coatColor: COAT_COLORS_LIST[getRandom(0, COAT_COLORS_LIST.length - 1)],
    eyesColor: EYES_COLORS_LIST[getRandom(0, EYES_COLORS_LIST.length - 1)]
  };
};

var fillWizardsData = function () {
  for (var i = 0; i < MAX_WIZARD; i++) {
    wizards.push(getWizardData());
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

var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  setup.querySelector('.setup-similar').classList.remove('hidden');
}

var renderALl = function () {
  fillWizardsData();
  renderWizards();
}

renderALl();

'use strict';

var setup = document.querySelector('.setup');

var FIRSTNAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS_LIST = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS_LIST = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS_LIST = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848',];
var MAX_WIZARD = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var setupWizard = document.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var indexCoat = 0;
var indexEyes = 0;
var indexFireball = 0;

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

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onOpenPopup = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
    openPopup();
  }
};

var onClosePopup = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
    closePopup();
  }
};

var onSetupWizardCoat = function () {
  (indexCoat >= COAT_COLORS_LIST.length - 1) ? indexCoat = 0 : indexCoat++;
  setupWizardCoat.style.fill = COAT_COLORS_LIST[indexCoat];
};

var onSetupWizardEyes = function () {
  (indexEyes >= EYES_COLORS_LIST.length - 1) ? indexEyes = 0 : indexEyes++;
  setupWizardEyes.style.fill = EYES_COLORS_LIST[indexEyes];
};

var onSetupWizardFireball = function () {
  (indexFireball >= FIREBALL_COLORS_LIST.length - 1) ? indexFireball = 0 : indexFireball++;
  setupWizardFireball.style.background = FIREBALL_COLORS_LIST[indexFireball];
};

var renderAll = function () {
  var wizards = fillWizardsData();
  renderWizards(wizards);

  setupOpen.addEventListener('click', onOpenPopup);
  setupOpen.addEventListener('keydown', onOpenPopup);
  setupClose.addEventListener('click', onClosePopup);
  setupClose.addEventListener('keydown', onClosePopup);
  setupUserName.addEventListener('focus', function() {
    document.removeEventListener('keydown', onPopupEscPress);
  });
  setupUserName.addEventListener('blur', function() {
    document.addEventListener('keydown', onPopupEscPress);
  });
  setupWizardCoat.addEventListener('click', onSetupWizardCoat);
  setupWizardEyes.addEventListener('click', onSetupWizardEyes);
  setupWizardFireball.addEventListener('click', onSetupWizardFireball);
};

renderAll();

'use strict';

var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FUTURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTMENT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var APARTMENT_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var BLOCK_SIZE = 600;
var RELATIVE_ADS_COUNT = 8;


var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Получаем элемент с идентификатором "housing-price". Используем селектор.
//var housePriceField = document.querySelector('#housing-price');

// Добавляем элементу housePriceField класс hidden
//housePriceField.classList.add('hidden');

// Удаляем класс hidden у элемента housePriceField
//housePriceField.classList.remove('hidden');

var randomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};


var createAds = function (count) {
  var relativeAds = [];
  for (var i = 0; i < count; i++) {
    var relativeAd = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png', // строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      }, offer: {
        title: 'заголовок предложения',
        address: randomNumber(0, 600) + '' + randomNumber(0, 600), // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        price: randomNumber(10, 100), // число, стоимость
        type: APARTMENT_TYPE[randomNumber(0, (APARTMENT_TYPE.length - 1))], // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        rooms: randomNumber(1, 5), // число, количество комнат
        guests: randomNumber(1, 5), // число, количество гостей, которое можно разместить
        checkin: CHECK_TIME[randomNumber(0, (CHECK_TIME.length - 1))], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        checkout: CHECK_TIME[randomNumber(0, (CHECK_TIME.length - 1))], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        features: function() {
          for (var j = 0; j < randomNumber(0, (FUTURES.length)); j++) {
            return FUTURES[j];
          }
        }, // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
        description: 'строка с описанием', // строка с описанием
        photos: APARTMENT_PHOTO[randomNumber(0, (APARTMENT_PHOTO.length - 1))], // массив строк случайной длины, содержащий адреса фотографий
      },

      location: {
        x: randomNumber(0, BLOCK_SIZE), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        y: randomNumber(130, 630),
      },
    };
    relativeAds.push(relativeAd);
  }
  return relativeAds;
};

createAds(RELATIVE_ADS_COUNT);

// var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
// var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', ' Нионго', 'Ирвинг'];
// var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
// var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
// var SIMPLE_WIZARD_COUNT = 4;
//
// var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');
//
// var similarListElement = userDialog.querySelector('.setup-similar-list');
//
// var similarWizardTemplate = document.querySelector('#similar-wizard-template')
//   .content
//   .querySelector('.setup-similar-item');
//
// var createWizards = function (count) {
//   var wizards = [];
//   for (var i = 0; i < count; i++) {
//     var wizard = {
//       name: WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)],
//       surname: WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)],
//       coatColor: WIZARD_COAT_COLOR[Math.floor(Math.random() * WIZARD_COAT_COLOR.length)],
//       eyesColor: WIZARD_EYES_COLOR[Math.floor(Math.random() * WIZARD_EYES_COLOR.length)],
//     };
//     wizards.push(wizard);
//   }
//   return wizards;
// };
//
// var renderWizard = function (wizard) {
//   var wizardElement = similarWizardTemplate.cloneNode(true);
//
//   wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
//   wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
//   wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
//
//   return wizardElement;
// };
//
// var printWizards = function () {
//   var wizardsList = createWizards(SIMPLE_WIZARD_COUNT);
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < wizardsList.length; i++) {
//     fragment.appendChild(renderWizard(wizardsList[i]));
//   }
//   similarListElement.appendChild(fragment);
//   userDialog.querySelector('.setup-similar').classList.remove('hidden');
// };
//
// printWizards();

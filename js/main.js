'use strict';
var ENTER_KEYCODE = 13;

var OFFER_TITLE = 'заголовок предложения #';
var DESCRIPTION = 'строка с описанием строка с описанием строка с описанием строка с описанием строка с описанием строка с описанием строка с описанием';
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTMENT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var APARTMENT_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var BLOCK_SIZE = 1100;
var RELATIVE_ADS_COUNT = 1;


var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFiltersForm = document.querySelector('.map__filters');


var removeElementsAttribute = function (parent, selector, attrName) {
  var childItems = parent.querySelectorAll(selector);
  Array.from(childItems).forEach(function (childItem) {
    childItem.removeAttribute(attrName);
  });
};


var enableMap = function () {
  map.classList.remove('map--faded');

  adForm.classList.remove('ad-form--disabled');
  removeElementsAttribute(adForm, 'fieldset', 'disabled');

  mapFiltersForm.classList.remove('ad-form--disabled');
  removeElementsAttribute(mapFiltersForm, 'select', 'disabled');
  removeElementsAttribute(mapFiltersForm, 'fieldset', 'disabled');
};

mapPinMain.addEventListener('click', function () {
  enableMap();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    enableMap();
  }
});


function getRandomNumberBetween(minNumber, maxNumber) {
  return Math.round(minNumber + Math.random() * (maxNumber - minNumber));
}

function getRandomElement(array, uniqueElement) {
  var randomIndex = Math.round((array.length - 1) * Math.random());
  var randomElement = array[randomIndex];
  if (uniqueElement === true) {
    array.splice(randomIndex, 1);
  }
  return randomElement;
}

var getRandomArray = function (array) {
  var randomArray = [];
  var elementsCount = getRandomNumberBetween(1, (array.length));
  for (var i = 0; i < elementsCount; i++) {
    var counter = i;
    if (randomArray.includes(array[counter])) {
      counter++;
    }
    randomArray.push(array[counter]);
  }
  return randomArray;
};

var createOffersList = function (offersListLength) {
  var offersList = [];
  for (var i = 0; i < offersListLength; i++) {
    var avatarImg = 'img/avatars/user0' + (i + 1) + '.png';
    var newOffer = {
      author: {
        avatar: avatarImg,
      },
      offer: {
        title: OFFER_TITLE + (i + 1),
        address: '' + getRandomNumberBetween(100, 999) + ', ' + getRandomNumberBetween(100, 999),
        price: getRandomNumberBetween(100, 2000) + ' USD',
        type: getRandomElement(APARTMENT_TYPE),
        rooms: getRandomNumberBetween(1, 10),
        guests: getRandomNumberBetween(1, 10),
        checkin: getRandomElement(CHECK_TIME),
        checkout: getRandomElement(CHECK_TIME),
        features: getRandomArray(FEATURES),
        description: DESCRIPTION,
        photos: getRandomArray(APARTMENT_PHOTO),
      },
      location: {
        x: getRandomNumberBetween(0, BLOCK_SIZE),
        y: getRandomNumberBetween(130, 630),
      },
    };
    offersList.push(newOffer);
  }
  return offersList;
};

var templateMapPin = document.querySelector('#pin').content.querySelector('.map__pin');

var createAd = function (ad) {
  var mapPin = templateMapPin.cloneNode(true);
  mapPin.style.left = ad.location.x + 'px';
  mapPin.style.top = ad.location.y + 'px';
  var mapPinAvatar = mapPin.querySelector('img');
  mapPinAvatar.src = ad.author.avatar;
  mapPinAvatar.alt = ad.offer.title;

  var offerCard = document.querySelector('#card').content.querySelector('.popup');
  var offerMap = document.querySelector('.map');
  offerMap.appendChild(offerCard.cloneNode(true));

  var mapCard = document.querySelector('.map__card');
  mapCard.querySelector('.popup__title').textContent = ad.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = ad.offer.address;
  mapCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = ad.offer.type;
  mapCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  mapCard.querySelector('.popup__description').textContent = ad.offer.description;
  mapCard.querySelector('.popup__avatar').src = ad.author.avatar;

  var mapCardFeatures = mapCard.querySelector('.popup__features');
  mapCardFeatures.innerHTML = '';

  for (var i = 0; i < ad.offer.features.length; i++) {
    var feature = ad.offer.features[i];
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', 'popup__feature--' + feature);
    mapCardFeatures.appendChild(featureElement);
  }

  var photos = mapCard.querySelector('.popup__photos');
  var photo = photos.querySelector('.popup__photo');
  var photoTemplate = photo.cloneNode(true);
  photo.remove();

  var photosFragment = document.createDocumentFragment();
  for (var j = 0; j < ad.offer.photos.length; j++) {
    var newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = ad.offer.photos[j];
    photosFragment.appendChild(newPhoto);
  }
  photos.appendChild(photosFragment);

  return mapPin;
};

var displayAds = function () {
  var cityMap = document.querySelector('.map__pins');
  var adsList = createOffersList(RELATIVE_ADS_COUNT);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsList.length; i++) {
    fragment.appendChild(createAd(adsList[i]));
  }
  cityMap.appendChild(fragment);
};

displayAds();

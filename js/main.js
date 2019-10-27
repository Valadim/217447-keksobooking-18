'use strict';

//var AVATAR_IMG_PATH = 'img/avatars/user{{x}}.png';
var OFFER_TITLE = 'заголовок предложения #';
var DESCRIPTION = 'строка с описанием';
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTMENT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var APARTMENT_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var BLOCK_SIZE = 600;
var RELATIVE_ADS_COUNT = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
    if(randomArray.includes(array[counter])) {
      counter++
    }
    randomArray.push(array[counter])
  }
  return randomArray;
};

var createOffersList = function (offersListLength) {
  var offersList = [];
  for (var i = 0; i < offersListLength; i++) {
    var avatarImg = 'img/avatars/user0' + (i + 1) + '.png';
    offersList.push({
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
      },
    );
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
  return mapPin;
};

var displayAds = function () {
  var adsList = createOffersList(RELATIVE_ADS_COUNT);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsList.length; i++) {
    fragment.appendChild(createAd(adsList[i]));
  }
  templateMapPin.appendChild(fragment);
};

displayAds();

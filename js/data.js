'use strict';

(function () {
  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var Room = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    ONEHUNDRED: '100'
  };

  var Capacity = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    EMPTY: '0'
  };

  var TypeValue = {
    PALACE: {
      text: 'Дворец',
      value: 'palace'
    },
    FLAT: {
      text: 'Квартира',
      value: 'flat'
    },
    HOUSE: {
      text: 'Дом',
      value: 'house'
    },
    BUNGALO: {
      text: 'Бунгало',
      value: 'bungalo'
    }
  };

  var Price = {
    LOW: {
      min: null,
      max: 10000
    },
    MIDDLE: {
      min: 10000,
      max: 50000
    },
    HIGH: {
      min: 50000,
      max: null
    }
  };

  var Feature = {
    WIFI: 'wifi',
    DISHWASHER: 'dishwasher',
    PARKING: 'parking',
    WASHER: 'washer',
    ELEVATOR: 'elevator',
    CONDITIONER: 'conditioner'
  };

  var LOCATION_MIN = 130;
  var LOCATION_MAX = 630;

  var AVATAR_MIN = 1;
  var AVATAR_MAX = 8;

  var getRandomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.abs(Math.round(rand));
  };

  var getRandomValue = function (values) {
    var randomIndex = getRandomInteger(0, values.length - 1);
    return values[randomIndex];
  };

  var getRandomItem = function () {
    var item = {
      author: {
        avatar: '0' + getRandomInteger(AVATAR_MIN, AVATAR_MAX)
      },
      offer: {
        title: 'Заголовок объявления',
        address: '600, 350',
        price: 500,
        type: getRandomValue(TYPES),
        rooms: 3,
        guests: 5,
        checkin: getRandomValue(TIMES),
        checkout: getRandomValue(TIMES),
        features: getRandomValue(FEATURES),
        description: 'Описание',
        photos: getRandomValue(PHOTOS)
      },
      location: {
        x: getRandomInteger(LOCATION_MIN, LOCATION_MAX),
        y: getRandomInteger(LOCATION_MIN, LOCATION_MAX)
      }
    };

    return item;
  };

  var getMokePins = function (count) {
    var items = [];
    for (var i = 0; i < count; i++) {
      items.push(getRandomItem());
    }
    return items;
  };

  window.data = {
    Types: TYPES,
    TypeValue: TypeValue,
    Times: TIMES,
    Room: Room,
    Capacity: Capacity,
    Feature: Feature,
    getMokePins: getMokePins,
    Features: FEATURES,
    Price: Price
  };
})();

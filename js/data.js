'use strict';

(function () {

  var Feature = {
    WIFI: 'wifi',
    DISHWASHER: 'dishwasher',
    PARKING: 'parking',
    WASHER: 'washer',
    ELEVATOR: 'elevator',
    CONDITIONER: 'conditioner'
  };

  var FEATURES = [
    Feature.WIFI,
    Feature.DISHWASHER,
    Feature.PARKING,
    Feature.WASHER,
    Feature.WASHER,
    Feature.ELEVATOR,
    Feature.CONDITIONER
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

  var Type = {
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

  window.data = {
    Type: Type,
    Room: Room,
    Capacity: Capacity,
    Feature: Feature,
    Features: FEATURES,
    Price: Price
  };
})();

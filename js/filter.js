'use strict';

(function () {
  var ANY_FILTER_VALUE = 'any';

  var dataModule = window.data;
  var debounce = window.debounce;

  var mapFormFilters = document.querySelector('.map__filters');

  var typeFilter = mapFormFilters.querySelector('#housing-type');
  var priceFilter = mapFormFilters.querySelector('#housing-price');
  var roomsFilter = mapFormFilters.querySelector('#housing-rooms');
  var guestsFilter = mapFormFilters.querySelector('#housing-guests');
  var featureFilters = mapFormFilters.querySelectorAll('.map__checkbox');
  var features = [];

  var CompareType = {
    VALUE: 1,
    RANGE: 2,
    ARRAY: 3
  };

  var FilterComparer = function () {
    this.filter = {};
    this.checkedProperties = [];
  };

  FilterComparer.prototype.getComparedEqual = function (filterValue, value) {
    return filterValue === value;
  };

  FilterComparer.prototype.getComparedRange = function (filterRange, value) {
    if (!filterRange.min) {
      return value <= filterRange.max;
    } else if (!filterRange.max) {
      return value >= filterRange.min;
    }

    return filterRange.min < value && value < filterRange.max;
  };

  FilterComparer.prototype.getComparedArray = function (filterArray, valueArray) {
    var filtredItems = filterArray.filter(function (filterValue) {
      return valueArray.includes(filterValue);
    });

    return filtredItems.length === filterArray.length;
  };

  FilterComparer.prototype.addFilterProperty = function (propertyName, compareType, value) {
    this.filter[propertyName] = {
      compareType: compareType,
      value: value
    };

    this.checkedProperties.push(propertyName);
  };

  FilterComparer.prototype.compare = function (propertyName, offer) {
    var filterValue = this.filter[propertyName].value;
    var compareType = this.filter[propertyName].compareType;
    var offerValue = offer[propertyName];

    switch (compareType) {
      case CompareType.VALUE:
        return this.getComparedEqual(filterValue, offerValue);
      case CompareType.RANGE:
        return this.getComparedRange(filterValue, offerValue);
      case CompareType.ARRAY:
        return this.getComparedArray(filterValue, offerValue);
    }
    return null;
  };

  var getFilterComparer = function () {
    var filterComparer = new FilterComparer();

    if (typeFilter.value !== ANY_FILTER_VALUE) {
      filterComparer.addFilterProperty('type', CompareType.VALUE, typeFilter.value);
    }

    if (priceFilter.value !== ANY_FILTER_VALUE) {
      var priceCompareValue = dataModule.Price[priceFilter.value.toUpperCase()];
      filterComparer.addFilterProperty('price', CompareType.RANGE, priceCompareValue);
    }

    if (roomsFilter.value !== ANY_FILTER_VALUE) {
      var roomsCompareValue = parseInt(roomsFilter.value, 10);
      filterComparer.addFilterProperty('rooms', CompareType.VALUE, roomsCompareValue);
    }

    if (guestsFilter.value !== ANY_FILTER_VALUE) {
      var guestsCompareValue = parseInt(guestsFilter.value, 10);
      filterComparer.addFilterProperty('guests', CompareType.VALUE, guestsCompareValue);
    }

    if (features.length) {
      filterComparer.addFilterProperty('features', CompareType.ARRAY, features);
    }

    return filterComparer.checkedProperties.length ? filterComparer : null;
  };

  var fillCheckedFeatures = function () {
    features = Array.from(featureFilters).filter(function (featureFilter) {
      return featureFilter.checked;
    }).map(function (featureFilterChecked) {
      return featureFilterChecked.value;
    });
  };

  var init = function (cb) {
    mapFormFilters.addEventListener('change', function (evt) {
      var options = {
        target: evt.target,
        cb: cb
      };

      debounce(onMapFiltersChange, options);
    });
  };

  var resetForm = function () {
    mapFormFilters.reset();
  };

  var onMapFiltersChange = function (args) {
    if (args.target.classList.contains('map__checkbox')) {
      fillCheckedFeatures();
    }

    if (args.cb) {
      args.cb();
    }
  };

  window.filter = {
    init: init,
    resetForm: resetForm,
    getFilterComparer: getFilterComparer
  };
})();

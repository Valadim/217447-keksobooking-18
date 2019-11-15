'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var createPin = function (pin, index, template) {
    var mapPin = template.content.querySelector('.map__pin');
    mapPin.style.left = pin.location.x - (PIN_WIDTH / 2) + 'px';
    mapPin.style.top = pin.location.y - PIN_HEIGHT + 'px';
    mapPin.dataset.index = index;

    var img = mapPin.querySelector('img');
    img.src = pin.author.avatar;
    img.alt = pin.offer.title;
    img.setAttribute('tabindex', index + 1);
    img.dataset.index = index;

    return mapPin;
  };

  window.pin = {
    createPin: createPin
  };
})();

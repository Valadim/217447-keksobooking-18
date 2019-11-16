'use strict';

(function () {
  var DELAY = 500;

  var lastTimeout = null;
  window.debounce = function (cb, args) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(args);
    }, DELAY);
  };
})();

'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content;
  var successTemplate = document.querySelector('#success').content;
  var errorMessage = null;
  var successMessage = null;
  var documentClickHandler = null;
  var mainNode = document.querySelector('main');

  var showErrorMessage = function (errorMessageText, onCloseCallback) {
    errorMessage = errorTemplate.querySelector('.error').cloneNode(true);
    var errorButton = errorMessage.querySelector('.error__button');

    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (errorMessage) {
        errorMessage.remove();
        errorMessage = null;
      }
      if (onCloseCallback) {
        onCloseCallback();
      }
    });
    mainNode.insertAdjacentElement('afterbegin', errorMessage);
  };

  var hideErrorMessage = function () {
    if (errorMessage) {
      errorMessage.remove();
      errorMessage = null;
    }
  };

  var showSuccessMessage = function () {
    successMessage = successTemplate.querySelector('.success').cloneNode(true);
    mainNode.insertAdjacentElement('afterbegin', successMessage);
    documentClickHandler = document.addEventListener('click', function () {
      if (successMessage) {
        hideSuccessMessage();
      }
    });
  };

  var hideSuccessMessage = function () {
    if (successMessage) {
      successMessage.remove();
      successMessage = null;
      document.removeEventListener('click', documentClickHandler);
      documentClickHandler = null;
    }
  };

  window.notification = {
    showErrorMessage: showErrorMessage,
    hideErrorMessage: hideErrorMessage,
    showSuccessMessage: showSuccessMessage,
    hideSuccessMessage: hideSuccessMessage
  };
})();

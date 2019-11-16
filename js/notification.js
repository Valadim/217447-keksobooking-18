'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content;
  var successTemplate = document.querySelector('#success').content;
  var errorMessage = null;
  var successMessage = null;
  var messageOverlayClickHandler = null;
  var mainNode = document.querySelector('main');

  var initMessageOverlayMouseClick = function (messageOverlay) {
    messageOverlayClickHandler = messageOverlay.addEventListener('click', function () {
      hideActiveMessage();
    });
  };

  var showErrorMessage = function (errorMessageText, onCloseCallback) {
    errorMessage = errorTemplate.querySelector('.error').cloneNode(true);
    var errorButton = errorMessage.querySelector('.error__button');

    var errorDescription = document.createElement('div');
    errorDescription.style.color = '#ffffff';
    errorDescription.textContent = errorMessageText;
    errorMessage.appendChild(errorDescription);

    errorMessage.insertBefore(errorDescription, errorButton);

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
    initMessageOverlayMouseClick(errorMessage);
  };

  var hideErrorMessage = function () {
    if (errorMessage) {
      errorMessage.remove();
      errorMessage = null;
    }
  };

  var hideActiveMessage = function () {
    if (successMessage || errorMessage) {
      document.removeEventListener('click', messageOverlayClickHandler);
      messageOverlayClickHandler = null;
    }
    if (successMessage) {
      successMessage.remove();
      successMessage = null;
    }
    if (errorMessage) {
      errorMessage.remove();
      errorMessage = null;
    }
  };

  var showSuccessMessage = function () {
    successMessage = successTemplate.querySelector('.success').cloneNode(true);
    mainNode.insertAdjacentElement('afterbegin', successMessage);
    initMessageOverlayMouseClick(successMessage);
  };

  window.notification = {
    showErrorMessage: showErrorMessage,
    hideErrorMessage: hideErrorMessage,
    showSuccessMessage: showSuccessMessage,
    hideActiveMessage: hideActiveMessage
  };
})();

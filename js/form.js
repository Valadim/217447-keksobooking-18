'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MAX_IMAGES_COUNT = 10;

  var FormDataImageKey = {
    AVATAR: 'avatar',
    IMAGES: 'images'
  };

  var dataModule = window.data;
  var backEndModule = window.backend;

  var RoomsCapacity = {};
  RoomsCapacity[dataModule.Room.ONE] = [dataModule.Capacity.ONE];
  RoomsCapacity[dataModule.Room.TWO] = [dataModule.Capacity.TWO, dataModule.Capacity.ONE];
  RoomsCapacity[dataModule.Room.THREE] = [dataModule.Capacity.THREE, dataModule.Capacity.TWO, dataModule.Capacity.ONE];
  RoomsCapacity[dataModule.Room.ONEHUNDRED] = [dataModule.Capacity.EMPTY];

  var MinTypesPrice = {};
  MinTypesPrice[dataModule.TypeValue.BUNGALO.value] = 0;
  MinTypesPrice[dataModule.TypeValue.FLAT.value] = 1000;
  MinTypesPrice[dataModule.TypeValue.HOUSE.value] = 5000;
  MinTypesPrice[dataModule.TypeValue.PALACE.value] = 10000;

  var adForm = document.querySelector('.ad-form');
  var adFormCapacity = adForm.querySelector('.ad-form #capacity');
  var adFormTitle = adForm.querySelector('.ad-form #title');
  var adFormType = adForm.querySelector('.ad-form #type');
  var adFormPrice = adForm.querySelector('.ad-form #price');
  var adFormTimeIn = adForm.querySelector('.ad-form #timein');
  var adFormTimeOut = adForm.querySelector('.ad-form #timeout');
  var adFormRoomNumber = document.querySelector('.ad-form #room_number');
  var adFormCapacityOptions = adFormCapacity.querySelectorAll('option');

  var mapAvatarData = null;
  var mapAvatarUploader = adForm.querySelector('input[type=file].ad-form-header__input');
  var mapAvatarDropArea = adForm.querySelector('.ad-form-header__drop-zone');
  var mapAvatar = adForm.querySelector('.ad-form-header__preview img');
  var mapAvatarImgUrl = mapAvatar.src;

  var mapImagesData = [];
  var getCheckMaxImages = function () {
    return mapImagesData.length < MAX_IMAGES_COUNT;
  };
  var imagesUploader = adForm.querySelector('input[type=file].ad-form__input');
  var imagesDropArea = adForm.querySelector('.ad-form__drop-zone');
  var imagesContainer = adForm.querySelector('.ad-form__photo-container');
  var formImage = adForm.querySelector('.ad-form__photo');

  var validateAdFormTitle = function () {
    var message = '';
    if (!adFormTitle.validity.valid) {
      if (adFormTitle.validity.valueMissing) {
        message = 'Это поле обязательное';
      } else if (adFormTitle.validity.tooShort) {
        message = 'Длинна должна быть не менее 30 символов';
      } else if (adFormTitle.validity.tooLong) {
        message = 'Длинна должна быть не более 100 символов';
      }
    }
    adFormTitle.setCustomValidity(message);
  };

  var checkAdFormRoomNumberValues = function () {
    var roomNumber = adFormRoomNumber.value;
    var optionCapacityOption = null;
    var optionCapacityValue = null;

    for (var i = 0; i < adFormCapacityOptions.length; i++) {
      optionCapacityOption = adFormCapacityOptions[i];
      optionCapacityValue = optionCapacityOption.value;
      optionCapacityOption.disabled = !RoomsCapacity[roomNumber].includes(optionCapacityValue);
    }
  };

  var validateaAFormCapacity = function () {
    var capacityValue = adFormCapacity.value;
    var roomNumber = adFormRoomNumber.value;
    var message = '';

    if (!RoomsCapacity[roomNumber].includes(capacityValue)) {
      switch (roomNumber) {
        case dataModule.Room.ONE:
          message = 'Выберите не более 1 гостя';
          break;
        case dataModule.Room.TWO:
          message = 'Выберите не более 2 гостей';
          break;
        case dataModule.Room.THREE:
          message = 'Выберите не более 3 гостей';
          break;
        case dataModule.Room.ONEHUNDRED:
          message = 'Выберите не для гостей';
          break;

        default: message = 'Неверное колличество гостей';
      }
    }
    adFormCapacity.setCustomValidity(message);
  };

  var validateAdFormPrice = function () {
    var typeValue = adFormType.value;
    var priceValue = +adFormPrice.value;
    var minPriceValue = MinTypesPrice[typeValue];

    var message = '';
    if (priceValue < minPriceValue) {
      switch (typeValue) {
        case dataModule.TypeValue.BUNGALO.value:
          message = 'Выберите не менее 0';
          break;
        case dataModule.TypeValue.FLAT.value:
          message = 'Выберите не менее 1000';
          break;
        case dataModule.TypeValue.HOUSE.value:
          message = 'Выберите не менее 5000';
          break;
        case dataModule.TypeValue.PALACE.value:
          message = 'Выберите не менее 10000';
          break;
      }
    }
    adFormPrice.setCustomValidity(message);
  };

  var checkAdFormTimes = function (target) {
    switch (target.id) {
      case adFormTimeIn.id:
        adFormTimeOut.value = adFormTimeIn.value;
        break;
      case adFormTimeOut.id:
        adFormTimeIn.value = adFormTimeOut.value;
        break;
    }
  };

  var onAdFormSelectInput = function (evt) {
    switch (evt.target.id) {
      case adFormTitle.id:
        validateAdFormTitle();
        break;
      case adFormPrice.id:
        validateAdFormPrice();
        break;
    }
  };

  var onAdFormSelectChange = function (evt) {
    switch (evt.target.id) {
      case adFormType.id:
        validateAdFormPrice();
        break;
      case adFormRoomNumber.id:
        checkAdFormRoomNumberValues();
        validateaAFormCapacity();
        break;
      case adFormCapacity.id:
        validateaAFormCapacity();
        break;
    }
    checkAdFormTimes(evt.target);
  };

  var initValidations = function () {
    adForm.addEventListener('change', function (evt) {
      onAdFormSelectChange(evt);
    }, true);
    adForm.addEventListener('input', function (evt) {
      onAdFormSelectInput(evt);
    }, true);
    validateaAFormCapacity();
  };

  var setAddress = function (value) {
    adForm.querySelector('#address').value = value;
  };

  var initFormEvents = function (onSuccess, onError) {
    adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();

      validateaAFormCapacity();

      if (adForm.checkValidity()) {
        var formData = new FormData(adForm);
        if (formData.has(FormDataImageKey.AVATAR)) {
          formData.delete(FormDataImageKey.AVATAR);
        }

        if (formData.has(FormDataImageKey.IMAGES)) {
          formData.delete(FormDataImageKey.IMAGES);
        }

        if (mapAvatarData) {
          formData.append(FormDataImageKey.AVATAR, mapAvatarData);
        }

        if (mapImagesData.length) {
          mapImagesData.forEach(function (image) {
            formData.append(FormDataImageKey.IMAGES, image);
          });
        }
        backEndModule.save(formData, onSuccess, onError);
      }
    });
    adForm.addEventListener('reset', function () {
      mapAvatar.src = mapAvatarImgUrl;

      var images = imagesContainer.querySelectorAll('.ad-form__photo');
      for (var i = images.length - 1; i >= 0; i--) {
        var image = images[i];
        if (!i) {
          image.style.backgroundImage = '';
        } else {
          image.remove();
        }
      }

      mapAvatarData = null;
      mapImagesData = [];
    });
  };

  var initPictureEvents = function (uploader, dropArea, cb) {

    var dragDropEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];
    var dragDropHoverEvents = ['dragenter', 'dragover'];
    var dragDropLeaveEvents = ['dragleave', 'drop'];

    uploader.addEventListener('change', function () {
      if (uploader.files.length) {
        if (uploader === mapAvatarUploader) {
          uploadPreview(uploader.files[0], cb);
        } else if (getCheckMaxImages()) {
          uploadPreview(uploader.files[0], cb);
        }
      }
    });

    function highlight() {
      dropArea.style.color = '#ff5635';
      dropArea.style.borderColor = '#ff5635';
    }

    function unhighlight() {
      dropArea.style.color = '';
      dropArea.style.borderColor = '';
    }

    dragDropEvents.forEach(function (eventName) {
      dropArea.addEventListener(eventName, function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }, false);
    });

    dragDropHoverEvents.forEach(function (eventName) {
      dropArea.addEventListener(eventName, function () {
        if (getCheckMaxImages()) {
          highlight();
        }
      }, false);
    });

    dragDropLeaveEvents.forEach(function (eventName) {
      dropArea.addEventListener(eventName, function () {
        if (getCheckMaxImages()) {
          unhighlight();
        }
      }, false);
    });

    dropArea.addEventListener('drop', function (evt) {
      if (evt.dataTransfer.files.length) {
        if (uploader === mapAvatarUploader) {
          uploadPreview(evt.dataTransfer.files[0], cb);
        } else if (getCheckMaxImages()) {
          unhighlight();

          Array.from(evt.dataTransfer.files).forEach(function (file) {
            uploadPreview(file, cb);
          });
        }
      }
    }, false);
  };

  var uploadPreview = function (file, cb) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (cb) {
          cb(reader.result);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  var init = function (onSaveSuccess, onSaveError) {
    initValidations();
    checkAdFormRoomNumberValues();
    validateAdFormPrice();
    checkAdFormTimes(adFormTimeIn);
    initFormEvents(onSaveSuccess, onSaveError);

    initPictureEvents(mapAvatarUploader, mapAvatarDropArea, function (imageData) {
      mapAvatar.src = imageData;
      mapAvatarData = imageData;
    }, true);

    initPictureEvents(imagesUploader, imagesDropArea, function (imageData) {
      var picturePreview = formImage;

      if (mapImagesData.length) {
        picturePreview = formImage.cloneNode(true);
        imagesContainer.appendChild(picturePreview);
      }

      picturePreview.style.backgroundImage = 'url(' + imageData + ')';
      picturePreview.style.backgroundSize = 'cover';

      mapImagesData.push(imageData);
    }, false);
  };

  window.form = {
    init: init,
    setAddress: setAddress
  };
})();

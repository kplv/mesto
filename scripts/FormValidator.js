export default class FormValidator {

  constructor(data, formElement) {

    this._fieldSetSelector = data.fieldSetSelector
    this._inputSelector = data.inputSelector
    this._submitButtonSelector = data.submitButtonSelector
    this._inputErrorClass = data.inputErrorClass
    this._errorClass = data.errorClass
    this._closeButton = data.closeButton
    this._popupSelector = data.popupSelector
    this._renderPopupSelector = data.renderPopupSelector;
    this._formElement = formElement;
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (inputElement) {
    console.log(inputElement);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }

  };

  _hasInvalidInput (inputList)  {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {buttonElement.disabled = true}
    else {buttonElement.disabled = false};
    console.log('check validity');
  }

  _resetErrors() {

  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    console.log(inputList);

    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(inputList, buttonElement);

    const check = (inputElement) => {
      this._checkInputValidity(inputElement);
    }

    const button = (inputList, buttonElement) => {
      this._toggleButtonState(inputList, buttonElement);
    }

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        check(inputElement);
        // чтобы проверять его при изменении любого из полей
        button(inputList, buttonElement);
      });
    });

    // const renderButton = document.querySelector(this._renderPopupSelector);
    // renderButton.addEventListener('click', function () {
    //   button(inputList, buttonElement)});



  }

  enableValidation(rest) {

      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      const fieldsetList = Array.from(this._formElement.querySelectorAll(this._fieldSetSelector));
      console.log(fieldsetList);
      fieldsetList.forEach((fieldSet) => {
      this._setEventListeners(this._formElement, rest);
  });


  }

  }


/*
export default class FormValidator {

constructor(formSelector, fieldSetSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass, closeButton,popupSelector, renderPopupSelector) {
  this._formSelector = formSelector
  this._fieldSetSelector = fieldSetSelector
  this._inputSelector = inputSelector
  this._submitButtonSelector = submitButtonSelector
  this._inputErrorClass = inputErrorClass
  this._errorClass = errorClass
  this._closeButton = closeButton
  this._popupSelector = popupSelector
  this._renderPopupSelector = renderPopupSelector;
}

_showInputError (formElement, inputElement, errorMessage, {inputErrorClass, errorClass, ...rest}) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

_hideInputError (formElement, inputElement, {inputErrorClass, errorClass, ...rest}) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

_checkInputValidity (formElement, inputElement, rest) {
  if (!inputElement.validity.valid) {
    this._showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    this._hideInputError(formElement, inputElement, rest);
  }
};

_hasInvalidInput (inputList)  {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

_toggleButtonState (inputList, buttonElement, rest) {
  if (this._hasInvalidInput(inputList)) {buttonElement.disabled = true}
  else {buttonElement.disabled = false};
  console.log('check validity');
}

_setEventListeners(formElement, {inputSelector, submitButtonSelector, closeButton, renderPopupSelector, ...rest}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  console.log(inputList);

  const buttonElement = formElement.querySelector(submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  this._toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      // чтобы проверять его при изменении любого из полей
      this._toggleButtonState(inputList, buttonElement, rest);
    });
  });

  const renderButton = document.querySelector(renderPopupSelector);
  renderButton.addEventListener('click', function () {
    this._toggleButtonState(inputList, buttonElement, rest)});

}

enableValidation({formSelector, fieldSetSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {

    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(fieldSetSelector));
    fieldsetList.forEach((fieldSet) => {
    this._setEventListeners(formElement, rest);
});
  });

}

}

 */

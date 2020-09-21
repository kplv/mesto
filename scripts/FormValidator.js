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
  }

  _resetErrors() {

  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

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

  }

  clearErrors() {
    const errorsInputs = Array.from(document.querySelectorAll(`.${this._inputErrorClass}`));
  errorsInputs.forEach((el) => {
    el.classList.remove('popup__input_error');
  });

  const errors = Array.from(document.querySelectorAll(`.${this._errorClass}`));
  errors.forEach((error) => {
    error.classList.remove(this._errorClass);
  });



  }

  enableValidation(rest) {

      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners();

  }

  }

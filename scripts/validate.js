/*
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, rest) => {
  if (hasInvalidInput(inputList)) {buttonElement.disabled = true}
  else {buttonElement.disabled = false};
  console.log('check validity');
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, closeButton, renderPopupSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  console.log(inputList);
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, rest);
    });
  });

  const renderButton = document.querySelector(renderPopupSelector);
  renderButton.addEventListener('click', function () {
    toggleButtonState(inputList, buttonElement, rest)});
};

const enableValidation = ({formSelector, fieldSetSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {

    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(fieldSetSelector));
    fieldsetList.forEach((fieldSet) => {
    setEventListeners(formElement, rest);
});
  });

};

const hideAllErrors = (popup) => {
  const errors = Array.from(popup.querySelectorAll('.popup__input-error'));
  errors.forEach((error) => {
    error.classList.remove('popup__input-error_active');
  });

  const errorsInputs = Array.from(popup.querySelectorAll('.popup__input_error'));
  errorsInputs.forEach((el) => {
    el.classList.remove('popup__input_error');
  });

}

enableValidation({
  formSelector: '.popup__container',
  fieldSetSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active',
  closeButton: '.popup__close-button',
  popupSelector: '.popup',
  renderPopupSelector: '.profile__add-button'
}); */


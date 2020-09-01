// Валидация

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {buttonElement.classList.add('popup__submit-button_inactive'); buttonElement.disabled = true} else {buttonElement.classList.remove('popup__submit-button_inactive'); buttonElement.disabled = false};
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });

  });
};

const hideAllErrors = () => {
  const errors = Array.from(document.querySelectorAll('.popup__input-error'));
  errors.forEach((error) => {
    error.classList.remove('popup__input-error_active');
  });

  const errorsInputs = Array.from(document.querySelectorAll('.popup__input_error'));
  errorsInputs.forEach((el) => {
    el.classList.remove('popup__input_error');
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });


    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));

    fieldsetList.forEach((fieldSet) => {
    setEventListeners(fieldSet);
});
  });
};

enableValidation();

//

editButton.addEventListener('click', enableValidation);

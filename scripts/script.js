
const containerCards = document.querySelector('.elements');

const imagePopup = document.querySelector('#popup-view-image');

const popupPlace = imagePopup.querySelector('.popup__place');
const popupPhoto = imagePopup.querySelector('.popup__image');

const editInfoPopup = document.querySelector('#edit-info');
const addPlacePopup = document.querySelector('#add-place');

const editForm = document.forms.info
const placeForm = document.forms.place

// Кнопки редактирования профиля и добавления места
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Кнопки закрытия всех попапов
const closeEditPopupButton = editInfoPopup.querySelector('.popup__close-button');
const closeAddPopupButton = addPlacePopup.querySelector('.popup__close-button');
const closeViewPopupButton = imagePopup.querySelector('.popup__close-button');

// const submitInfoButton = document.querySelector('#submit-info');
const submitPlaceButton = document.querySelector('#submit-place');
const formElement = document.querySelector('.popup__container');

// Инпуты места и картинки и места для их вставки
const placeInput = placeForm.querySelector('.popup__input_place');
const imageInput = placeForm.querySelector('.popup__input_image');

// Имя и профессия в профиле
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Поля ввода Имени и профессии
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_job');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {closePopup(popup)} });

}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  const errors = Array.from(popup.querySelectorAll('.popup__input-error'));
  errors.forEach((error) => {
    error.classList.remove('popup__input-error_active');
  });

  const errorsInputs = Array.from(popup.querySelectorAll('.popup__input_error'));
  errorsInputs.forEach((el) => {
    el.classList.remove('popup__input_error');
  });

}

const openEditPopup = () => {
  openPopup(editInfoPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  ValidateEdit.enableValidation();
}

const openAddPopup = () => {
  openPopup(addPlacePopup);
  placeInput.value = '';
  imageInput.value = '';
  ValidateAdd.enableValidation();

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {closePopup(addPlacePopup)};
  });
}

const addPlace = (event) => {
  event.preventDefault();
  const card = new Card(placeInput.value, imageInput.value);
  card._render(containerCards, true);
  closePopup(addPlacePopup);

}

import Card from './Card.js';
import FormValidator from './FormValidator.js';

const data = ({
  formSelector: '.popup__container',
  fieldSetSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active',
  closeButton: '.popup__close-button',
  popupSelector: '.popup',
  renderPopupSelector: '.profile__add-button'
});

const ValidateEdit = new FormValidator(data, editForm);
ValidateEdit.enableValidation();

const ValidateAdd = new FormValidator(data, placeForm);
ValidateAdd.enableValidation();


  initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  card._render(containerCards);
});

  // Слушатели для открытия модалок
  editButton.addEventListener('click', openEditPopup);
  addButton.addEventListener('click', openAddPopup);

  // Слушатели для закрытия модалок
  closeEditPopupButton.addEventListener('click', function() {closePopup(editInfoPopup)});
  closeAddPopupButton.addEventListener('click', function() {closePopup(addPlacePopup)});
  // closeAddPopupButton.addEventListener('click', function() {placeForm.reset()});
  closeViewPopupButton.addEventListener('click', function() {closePopup(imagePopup)});

  const updateInfo = (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    profileName.textContent = name;
    profileJob.textContent = job;
    closePopup(editInfoPopup);
  }

  editForm.addEventListener('submit', updateInfo);
  placeForm.addEventListener('submit', addPlace);

  document.addEventListener('click', function (evt) {
    if (evt.target === document.querySelector('.popup_opened')) {closePopup(evt.target)}
  });

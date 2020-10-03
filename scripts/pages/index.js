import {items} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

const containerCards = document.querySelector('.elements');
const cardListSelector = '.elements';

const imagePopup = document.querySelector('#popup-view-image');

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
  ValidateEdit.clearErrors();
}

const openEditPopup = () => {
  openPopup(editInfoPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const openAddPopup = () => {
  openPopup(addPlacePopup);
  placeForm.reset();
  placeForm.querySelector('.popup__submit-button').disabled = true;
}

const addPlace = (event) => {
  event.preventDefault();

  const item = {
    name: placeInput.value,
    link: imageInput.value
  }
  const card = new Card(item, '#element', containerCards);
  card.get()
  closePopup(addPlacePopup);
}



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


const cardList = new Section({
  data: items,
  renderer: (item) => {
    const card = new Card(item, '#element');
    const cardElement = card.get();
    cardList.setItem(cardElement);
  }
}, cardListSelector);

cardList.renderItems();



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

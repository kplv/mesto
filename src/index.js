import {items} from './scripts/utils/constants.js';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import Section from './scripts/components/Section.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import './pages/index.css'

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
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {closePopup(popup)} });

}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  ValidateEdit.clearErrors();
}

const openAddPopup = () => {
  openPopup(addPlacePopup);
  placeForm.reset();
  placeForm.querySelector('.popup__submit-button').disabled = true;
}

/* const addPlace = (event) => {
  event.preventDefault();
  const formItem = [{
    name: placeInput.value,
    link: imageInput.value
  }]

  const cardList = new Section({
    data: formItem,
    renderer: (item) => {
      const card = new Card(item, '#element', {handleCardClick: () => {
        const popup = new PopupWithImage('#popup-view-image');
        popup.open(item.name, item.link)
      }});
      const cardElement = card.get();
      cardList.setUserItem(cardElement);
    }
  }, cardListSelector);

  cardList.renderItems();

  closePopup(addPlacePopup);
} */

const cardList = new Section({
  data: items,
  renderer: (item) => {
    const card = new Card(item, '#element', {handleCardClick: () => {

      const popup = new PopupWithImage('#popup-view-image');
      popup.open(item.name, item.link)
    }});
    const cardElement = card.get();
    cardList.setItem(cardElement);
  }
}, cardListSelector);

cardList.renderItems();


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




  // Слушатели для открытия модалок
  // editButton.addEventListener('click', openEditPopup);

 /*  const updateInfo = (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    profileName.textContent = name;
    profileJob.textContent = job;
    closePopup(editInfoPopup);
  } */

  // editForm.addEventListener('submit', updateInfo);

  const popup = new PopupWithForm('#add-place', { submit: () => {

    const items = popup.getInputValues();

    const newList = new Section({
      data: items,
      renderer: (item) => {
        const card = new Card(item, '#element', {handleCardClick: () => {
          const popup = new PopupWithImage('#popup-view-image');
          popup.open(item.name, item.link)
        }});
        const cardElement = card.get();
        newList.setUserItem(cardElement);
      }
    }, cardListSelector);

    newList.renderItems();

  }}, getUserInfo, setUserInfo);

  addButton.addEventListener('click', function() {
    popup.open();
  })

/*   addButton.addEventListener('click', function() {

    const popup = new PopupWithForm('#add-place', { submit: () => {

      const items = popup.getInputValues();

      const newList = new Section({
        data: items,
        renderer: (item) => {
          const card = new Card(item, '#element', {handleCardClick: () => {
            const popup = new PopupWithImage('#popup-view-image');
            popup.open(item.name, item.link)
          }});
          const cardElement = card.get();
          newList.setUserItem(cardElement);
        }
      }, cardListSelector);

      newList.renderItems();

    }}, getUserInfo, setUserInfo);
    popup.open();
  }) */

  const userInfo = new UserInfo('.profile__name', '.profile__job');
  // console.log(userInfo.getUserInfo());
  userInfo.setUserInfo({name: 'Гвоздь', info: 'Работник зала'});

  function getUserInfo(){
    return userInfo.getUserInfo();
  }

  function setUserInfo(data){
    userInfo.setUserInfo(data);
  }

  const popupEdit = new PopupWithForm('#edit-info',{submit: () =>{
    popupEdit.setUserInfo(popupEdit.getInputValues());
    // console.log(popupEdit.getInputValues())
    console.log('один раз');
  }}, getUserInfo, setUserInfo)

  editButton.addEventListener('click',() => {
    popupEdit.open();
  })


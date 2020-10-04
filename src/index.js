import {items} from './scripts/utils/constants.js';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import Section from './scripts/components/Section.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import './pages/index.css'

import {
  cardListSelector,
  editForm,
  placeForm,
  editButton,
  addButton
} from './scripts/utils/constants.js';

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

function clearEdit(){
  ValidateEdit.clearErrors();
}

const ValidateAdd = new FormValidator(data, placeForm);
ValidateAdd.enableValidation();

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

  const userInfo = new UserInfo('.profile__name', '.profile__job');

  function getUserInfo(){
    return userInfo.getUserInfo();
  }

  function setUserInfo(data){
    userInfo.setUserInfo(data);
  }

  const popupEdit = new PopupWithForm('#edit-info',{submit: () =>{
    popupEdit.setUserInfo(popupEdit.getInputValues());
  }}, getUserInfo, setUserInfo)

  editButton.addEventListener('click',() => {
    popupEdit.open();
  })


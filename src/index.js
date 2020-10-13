import { items } from './scripts/utils/constants.js';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import Section from './scripts/components/Section.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import Api from './scripts/components/Api.js';
import './pages/index.css'

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '772a31b7-eda1-4168-bd66-de55c47df54e',
    'Content-Type': 'application/json'
  }
});


import {
  cardListSelector,
  editForm,
  placeForm,
  editButton,
  addButton,
  avatar
} from './scripts/utils/constants.js';


api.getUserInfo().then((res) => {
  setUserInfo(res);
  avatar.src = res.avatar;
});



api.getAllCards().then((res) => {

  const cardList = new Section({
    data: res,
    renderer: (item) => {

      api.getUserInfo().then((res) => {
        if (res._id === item.owner._id) { console.log('true') } else { card._deleteButton.style.visibility = "hidden" };

        if (item.likes.some(owner => owner.name === res.name)) {console.log(item)}

      });

      const card = new Card(item, '#element', api, {
        handleCardClick: () => {

          const popup = new PopupWithImage('#popup-view-image');
          popup.open(item.name, item.link)
          popup.setEventListeners()
        },

        handleDeleteClick: () => {

          const deletePopup = new PopupWithForm('#popup-delete-image', {
            submit: () => {
              api.deleteCard(item).then((res) => {
                console.log(res);
                card._delete();
              })

            }
          })

          deletePopup.setEventListeners();

          deletePopup.open();



        },
        handleLikeClick: () => {

          api.getUserInfo().then((res) => {

          });


          card._like();
          api.likeCard(item).then((res) => {

            card._likeCounter.textContent = Object.keys(res.likes).length;

          })

        }
      });
      const cardElement = card.get();

      cardList.appendItem(cardElement);





    }
  }, cardListSelector);

  cardList.renderItems();


});



/* const cardList = new Section({
  data: items,
  renderer: (item) => {
    const card = new Card(item, '#element', {handleCardClick: () => {

      const popup = new PopupWithImage('#popup-view-image');
      popup.open(item.name, item.link)
      popup.setEventListeners()
    }});
    const cardElement = card.get();
    cardList.appendItem(cardElement);
  }
}, cardListSelector);

cardList.renderItems(); */

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

function clearErrors() {
  ValidateEdit.clearErrors();
}

// Проверка кнопки при открытии
function editValidate() {
  ValidateEdit.enableValidation();
}

const ValidateAdd = new FormValidator(data, placeForm);
ValidateAdd.enableValidation();

// Проверка кнопки при открытии
function addValidate() {
  ValidateAdd.enableValidation();
}

const popup = new PopupWithForm('#add-place', {
  submit: () => {

    const apiAddPlace = new Api({
      url: 'https://mesto.nomoreparties.co/v1/cohort-16',
      headers: {
        authorization: '772a31b7-eda1-4168-bd66-de55c47df54e',
        'Content-Type': 'application/json'
      }
    });

    const items = popup.getInputValues();


    apiAddPlace.addCard(items).then((res) => {

      const cardList = new Section({
        data: res,
        renderer: (item) => {

          api.getUserInfo().then((res) => {
            if (res._id === item.owner._id) { console.log('true') } else { card._deleteButton.style.visibility = "hidden" }
          });

          const card = new Card(item, '#element', api, {
            handleCardClick: () => {

              const popup = new PopupWithImage('#popup-view-image');
              popup.open(item.name, item.link)
              popup.setEventListeners()
            },

            handleDeleteClick: () => {

              const deletePopup = new PopupWithForm('#popup-delete-image', {
                submit: () => {

                  api.deleteCard(item).then((res) => {
                    console.log(res);
                    card._delete();
                  })

                }
              })

              deletePopup.setEventListeners();

              deletePopup.open();





            }
          });
          const cardElement = card.get();

          cardList.prependItem(cardElement);





        }
      }, cardListSelector);

      cardList.renderItems();

    })


    /*     const newList = new Section({
          data: items,
          renderer: (item) => {
            const card = new Card(item, '#element', {handleCardClick: () => {
              const popup = new PopupWithImage('#popup-view-image');
              popup.open(item.name, item.link)
              popup.setEventListeners();
            }});
            const cardElement = card.get();
            newList.prependItem(cardElement);
          }
        }, cardListSelector);

        newList.renderItems(); */

  }
});
popup.setEventListeners();

addButton.addEventListener('click', function () {
  popup.open();
  ValidateAdd.enableValidation();
  ValidateAdd.clearErrors();
})

const userInfo = new UserInfo('.profile__name', '.profile__job');

function getUserInfo() {
  return userInfo.getUserInfo();
}

function setUserInfo(data) {
  userInfo.setUserInfo(data);
}

const popupEdit = new PopupWithForm('#edit-info', {
  submit: () => {

    const apiUpdateInfo = new Api({
      url: 'https://mesto.nomoreparties.co/v1/cohort-16',
      headers: {
        authorization: '772a31b7-eda1-4168-bd66-de55c47df54e',
        'Content-Type': 'application/json'
      }
    });

    apiUpdateInfo.updateUserInfo(popupEdit.getInputValues()).then((res) => { console.log(res) });

    api.getUserInfo().then((res) => {
      setUserInfo(res);
      avatar.src = res.avatar;
    });

  }
})
popupEdit.setEventListeners();


editButton.addEventListener('click', () => {
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open();
  // Проверка при открытии модального кона
  ValidateEdit.enableValidation();
  ValidateEdit.clearErrors();
})


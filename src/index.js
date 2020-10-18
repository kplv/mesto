import { items } from './scripts/utils/constants.js';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import Section from './scripts/components/Section.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import Api from './scripts/components/Api.js';
import './pages/index.css'

import {
  cardListSelector,
  editForm,
  placeForm,
  updateForm,
  editButton,
  addButton,
  avatar
} from './scripts/utils/constants.js';

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

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '772a31b7-eda1-4168-bd66-de55c47df54e',
    'Content-Type': 'application/json'
  }
});

// Запроса первых данных

api.getInitialData().then(res => {
  const [userData, cardsData] = res;

  const userInfo = new UserInfo('.profile__name', '.profile__job');

  function setUserInfo(data) {
    userInfo.setUserInfo(data);
  }

  setUserInfo(userData);
  avatar.src = userData.avatar;

  // Запрос карточек

  const cardList = new Section({
    data: cardsData,
    renderer: (item) => {

      const card = new Card(item, '#element', api, {
        handleCardClick: () => {
          const popup = new PopupWithImage('#popup-view-image');
          popup.open(item.name, item.link)
          popup.setEventListeners()
        },

        handleDeleteClick: () => {
          const deletePopup = new PopupWithForm('#popup-delete-image', {
            submit: () => {
              deletePopup.loading();
              api.deleteCard(item).then((res) => {
                console.log(res);
                card._delete();
              })
                .catch(err => console.log(err)).finally(deletePopup.close(), deletePopup.loaded())

            }
          })

          deletePopup.setEventListeners();
          deletePopup.open();

        },
        // Функция лайка
        handleLikeClick: () => {

          if (item.likes.some(e => e._id === userData._id)) {

            api.dislikeCard(item).then((res) => {
              console.log('дислайк')
              card._like()
              item.likes = res.likes;
              console.log(res.likes)
              card.view.querySelector('.element__likes').textContent = Object.keys(item.likes).length
            }).catch(err => console.log(err))
          } else {
            api.likeCard(item).then((res) => {
              console.log('лайк')
              card._like()
              item.likes = res.likes;
              console.log(res.likes)
              card.view.querySelector('.element__likes').textContent = Object.keys(item.likes).length
            }).catch(err => console.log(err))
          }


        }
        // Конец функции лайка

      });



      const cardElement = card.get();

      // Проверка кнопки удаления
      if (userData._id !== item.owner._id) {
        card._deleteButton.style.visibility = "hidden"
      };

      // Проверка лайка
      if (item.likes.some(e => e._id === userData._id)) {
        card._like();
      }

      cardList.appendItem(cardElement);


    }
  }, cardListSelector)

  // Конец запроса карточек

  // Вставка карточек в HTML
  cardList.renderItems();

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

      popup.loading()

      const items = popup.getInputValues();


      api.addCard(items).then((res) => {

        const cardList = new Section({
          data: res,
          renderer: (item) => {

            const card = new Card(item, '#element', api, {
              handleCardClick: () => {
                const popup = new PopupWithImage('#popup-view-image');
                popup.open(item.name, item.link)
                popup.setEventListeners()
              },

              handleDeleteClick: () => {
                const deletePopup = new PopupWithForm('#popup-delete-image', {
                  submit: () => {
                    deletePopup.loading()
                    api.deleteCard(item).then((res) => {
                      console.log(res);
                      card._delete();
                    })
                      .catch(err => console.log(err)).finally(deletePopup.close(), deletePopup.loaded())

                  }
                })

                deletePopup.setEventListeners();
                deletePopup.open();

              },
              // Функция лайка
              handleLikeClick: () => {

                if (item.likes.some(e => e._id === userData._id)) {

                  api.dislikeCard(item).then((res) => {
                    console.log('дислайк')
                    card._like()
                    item.likes = res.likes;
                    console.log(res.likes)
                    card.view.querySelector('.element__likes').textContent = Object.keys(item.likes).length
                  }).catch(err => console.log(err))
                } else {
                  api.likeCard(item).then((res) => {
                    console.log('лайк')
                    card._like()
                    item.likes = res.likes;
                    console.log(res.likes)
                    card.view.querySelector('.element__likes').textContent = Object.keys(item.likes).length
                  }).catch(err => console.log(err))
                }


              }
              // Конец функции лайка

            });



            const cardElement = card.get();

            // Проверка кнопки удаления
            if (userData._id !== item.owner._id) {
              card._deleteButton.style.visibility = "hidden"
            };

            // Проверка лайка
            if (item.likes.some(e => e._id === userData._id)) {
              card._like();
            }

            cardList.prependItem(cardElement);


          }
        }, cardListSelector)

        // Конец запроса карточек

        // Вставка карточек в HTML
        cardList.renderItems();




      }).catch(err => console.log(err))
        .finally(popup.loaded(), popup.close());
    }
  });
  popup.setEventListeners();

  addButton.addEventListener('click', function () {
    popup.open();
    ValidateAdd.enableValidation();
    ValidateAdd.clearErrors();
  })

  const popupEdit = new PopupWithForm('#edit-info', {
    submit: () => {

      popupEdit.loading();
      const apiUpdateInfo = new Api({
        url: 'https://mesto.nomoreparties.co/v1/cohort-16',
        headers: {
          authorization: '772a31b7-eda1-4168-bd66-de55c47df54e',
          'Content-Type': 'application/json'
        }
      });

      apiUpdateInfo.updateUserInfo(popupEdit.getInputValues()).then((res) => {
        console.log(res);
        setUserInfo(res);
        avatar.src = res.avatar;
      }).catch(err => console.log(err)).finally(popupEdit.loaded(), popupEdit.close())


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

  const updateAvaButton = document.querySelector('.profile__button-update');

  const ValidateUpdate = new FormValidator(data, updateForm);
  ValidateUpdate.enableValidation();

  console.log(editForm, placeForm, updateForm)

  const updateAvaPopup = new PopupWithForm('#popup-update-ava', {
    submit: () => {
      updateAvaPopup.loading();
      api.updatePhotoCard(updateForm.querySelector('#ava-input').value).then((res) => { avatar.src = res.avatar; })
        .catch(err => console.log(err))
        .finally(updateAvaPopup.loaded(), updateAvaPopup.close());
    }
  })

  updateAvaPopup.setEventListeners();




  updateAvaButton.addEventListener('click', () => {
    updateAvaPopup.open();
    // Проверка при открытии модального кона
    ValidateUpdate.enableValidation();
    ValidateUpdate.clearErrors();
  })





}).catch(err => console.log(err)).finally(document.querySelector('.page__spinner').style.visibility = "hidden")







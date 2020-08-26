let popup = document.querySelector('.popup');
let imagePopup = document.querySelector('.popup_image');

let popupPlace = imagePopup.querySelector('.popup__place');
let popupPhoto = imagePopup.querySelector('.popup__image');

let editInfoPopup = document.querySelector('#edit-info');
let addPlacePopup = document.querySelector('#add-place');

let editForm = document.forms.info
let placeForm = document.forms.place

let editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let addButton = document.querySelector('.profile__add-button');

let likeButton = document.querySelector('.element__like-button');
let deleteButton = document.querySelector('.element__delete-button')
let image = document.querySelector('.element__image');

let submitInfoButton = document.querySelector('#submit-info');
let submitPlaceButton = document.querySelector('#submit-place');
let formElement = document.querySelector('.popup__container');

let placeInput = placeForm.querySelector('.popup__input_place'); // Воспользуйтесь инструментом .querySelector()
let imageInput = placeForm.querySelector('.popup__input_image'); // Воспользуйтесь инструментом .querySelector()

let cards = document.querySelectorAll('.element');

const renderCards = () => {
  cards = document.querySelectorAll('.element');
}

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const containerCards = document.querySelector('.elements');

  // Проверка карточек на действия

  const cardsActions = () => {
    renderCards();

    cards.forEach(function (item) {
    likeButton = item.querySelector('.element__like-button');
    deleteButton = item.querySelector('.element__delete-button');
    let image = item.querySelector('.element__image');
    let elementTitle = item.querySelector('.element__title');

      deleteButton.addEventListener('click', event => {
        item.remove();
      })

      likeButton.addEventListener('click', event => {
        event.target.classList.add('element__like-button_liked');
      })

      image.addEventListener('click', event => {
        console.log('йоу');
        imagePopup.classList.add('popup_opened');
        popupPlace.textContent = elementTitle.textContent;
        popupPhoto.src = image.src;
        closeButton = imagePopup.querySelector('.popup__close-button');
        fadeIn(imagePopup);
        closeButton.addEventListener('click', event => {imagePopup.classList.remove('popup_opened');});

      })

    });

   };

// Функция добавления новых карточек в DOM

const addCard = (name, link, where) => {

  const card = document.querySelector('#element').content.cloneNode(true);
  card.querySelector('.element__title').textContent = name
  card.querySelector('.element__image').src = link

  if ( where === 'start') {containerCards.prepend(card)} else {containerCards.append(card)};
  cardsActions();
}

// Конец функции добавления новых карточек в DOM

initialCards.forEach(item => addCard(item.name, item.link));


const statePopup = (event, popupType) => {

const target = event.target;

if (target === editButton) {
  formElement = document.forms.info;
  editInfoPopup.classList.toggle('popup_opened');
  fadeIn(editInfoPopup);
  let nameInput = formElement.querySelector('.popup__input_name'); // Воспользуйтесь инструментом .querySelector()
  let jobInput = formElement.querySelector('.popup__input_job'); // Воспользуйтесь инструментом .querySelector()

  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

else if (target === addButton) {
  addPlacePopup.classList.toggle('popup_opened');
  fadeIn(addPlacePopup);
  formElement = document.forms.place;
  closeButton = addPlacePopup.querySelector('.popup__close-button');
  placeInput.value = '';
  imageInput.value = '';

} else {fadeIn(editInfoPopup); fadeIn(addPlacePopup);}

};

function sendToServer (event) {
  event.preventDefault();
  editInfoPopup.classList.remove('popup_opened');
  addPlacePopup.classList.remove('popup_opened');
  fadeIn(editInfoPopup);
  fadeIn(addPlacePopup);
}

const saveInfo = event =>  {

  if (editInfoPopup.classList.contains('popup_opened')) {

  let nameInput = formElement.querySelector('.popup__input_name'); // Воспользуйтесь инструментом .querySelector()
  let jobInput = formElement.querySelector('.popup__input_job'); // Воспользуйтесь инструментом .querySelector()

  // Получите значение полей из свойства value
  let name = nameInput.value;
  let job = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  // Вставьте новые значения с помощью textContent
    profileName.textContent = name;
    profileJob.textContent = job; }

  else {

    // Получите значение полей из свойства value
    let place = placeInput.value;
    let image = imageInput.value;

    addCard(place, image, 'start');
    placeInput.value = '';
    imageInput.value = '';

    }

  };

  editButton.addEventListener('click', statePopup);
  addButton.addEventListener('click', statePopup);
  closeButton.addEventListener('click', statePopup);

  submitInfoButton.addEventListener('click', saveInfo);
  submitPlaceButton.addEventListener('click', saveInfo);

  editForm.addEventListener('submit', sendToServer);
  placeForm.addEventListener('submit', sendToServer);

  const fadeIn = (popupType) => {
    if (!popupType.classList.contains('fade-in')) {popupType.classList.add('fade-in')} else if (popupType.classList.contains('fade-in')) {popupType.classList.remove('fade-in')};

  }

/* renderCards();

cards.forEach(function (item) {

item.addEventListener('click', event => {

  likeButton = event.target.closest('.element__like-button');
  deleteButton = event.target.closest('.element__delete-button');
  if (deleteButton) {item.remove()} else {};
  if (likeButton) {likeButton.classList.toggle('element__like-button_liked')} else {};
)}; */


/*   ————

  const elementImage = document.querySelector('.element__picture');
  const popupZoom = document.querySelector('.popup-zoom');
const closeZoomButton = popupZoom.querySelector('.popup-zoom__close-button');

elementImage.addEventListener('click', event => {
    const element = event.target.closest('.element');
    const elementPicture = element.querySelector('.element__picture').src;
    const elementName = element.querySelector('.element__name').textContent;
    popupZoom.querySelector('.popup-zoom__image').src = elementPicture;
    popupZoom.querySelector('.popup-zoom__name').textContent = elementName;
    popupZoom.classList.add('popup-zoom_opened');
})

function closePopupZoom() {
    popupZoom.classList.remove('popup-zoom_opened');
}

closeZoomButton.addEventListener('click', closePopupZoom);

———
 */


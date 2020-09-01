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

const submitInfoButton = document.querySelector('#submit-info');
const submitPlaceButton = document.querySelector('#submit-place');
const formElement = document.querySelector('.popup__container');

// Инпуты места и картинки и места для их вставки
const placeInput = placeForm.querySelector('.popup__input_place');
const imageInput = placeForm.querySelector('.popup__input_image');

const cards = document.querySelectorAll('.element');
const containerCards = document.querySelector('.elements');

// Имя и профессия в профиле
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Поля ввода Имени и профессии
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_job');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  hideAllErrors();
}

const openEditPopup = () => {
  openPopup(editInfoPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {closePopup(editInfoPopup)};
  });
}

const openAddPopup = () => {
  openPopup(addPlacePopup);
  placeInput.value = '';
  imageInput.value = '';

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {closePopup(addPlacePopup)};
  });
}

// Функция добавления новых карточек в DOM

const addCard = (name, link, where) => {
  const cardTemplate = document.querySelector('#element').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = name
  cardElement.querySelector('.element__image').src = link

  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    const eventTarget = evt.target
    eventTarget.classList.toggle('element__like-button_liked');
  });

  cardElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
    openPopup(imagePopup);
    popupPlace.textContent = name;
    const eventTarget = evt.target
    popupPhoto.src = eventTarget.src;

  });

  if ( where === 'start') {containerCards.prepend(cardElement)} else {containerCards.append(cardElement)};

}

initialCards.forEach(item => addCard(item.name, item.link));

  // Слушатели для открытия модалок
  editButton.addEventListener('click', openEditPopup);
  addButton.addEventListener('click', openAddPopup);

  // Слушатели для закрытия модалок
  closeEditPopupButton.addEventListener('click', function() {closePopup(editInfoPopup)});
  closeAddPopupButton.addEventListener('click', function() {closePopup(addPlacePopup)});
  closeViewPopupButton.addEventListener('click', function() {closePopup(imagePopup)});

  const updateInfo = (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;

    profileName.textContent = name;
    profileJob.textContent = job;
    closePopup(editInfoPopup);
  }

  const addPlace = (event) => {
    event.preventDefault();
    const place = placeInput.value;
    const image = imageInput.value;
    addCard(place, image, 'start');
    closePopup(addPlacePopup);
  }

  const closeByClick = (evt) => {
    console.log(evt.target);
  }

  editForm.addEventListener('submit', updateInfo);
  placeForm.addEventListener('submit', addPlace);

  document.addEventListener('click', function (evt) {
    if (evt.target === document.querySelector('.popup_opened')) {evt.target.classList.remove('popup_opened')}
  });

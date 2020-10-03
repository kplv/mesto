export default class Card {

  constructor(data, template) {
    this._title = data.name;
    this._image = data.link;
    this._template = template;
  }

  get open() { return openPopup(imagePopup); }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);
      return cardElement;
  }

  _handleLike() {
    this._likeButton.classList.toggle('element__like-button_liked');
  }

  _handleDelete() {
    this._view.remove();
    this._view= null;
  }

 _handleView() {

  const imagePopup = document.querySelector('#popup-view-image');
  const popupPlace = imagePopup.querySelector('.popup__place');
  const popupPhoto = imagePopup.querySelector('.popup__image');

  popupPlace.textContent = this._title;
  popupPhoto.src = this._image.src;

  document.querySelector('#popup-view-image').classList.add('popup_opened');

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {document.querySelector('#popup-view-image').classList.remove('popup_opened')} });

  document.addEventListener('click', function (evt) {
      if (evt.target === document.querySelector('.popup_opened')) {document.querySelector('#popup-view-image').classList.remove('popup_opened')}
    });
 }

  _setEventListeners() {

    this._likeButton = this._view.querySelector('.element__like-button');
    this._deleteButton = this._view.querySelector('.element__delete-button');
    this._image = this._view.querySelector('.element__image');

    this._likeButton.addEventListener('click',() => {
      this._handleLike();
    });

    this._deleteButton.addEventListener('click',() => {
      this._handleDelete();
    });

    this._image.addEventListener('click',() => {
      this._handleView();
    });

  }

  get() {
    this._view = this._getTemplate();
    this._view.querySelector('.element__image').src = this._image;
    this._view.querySelector('.element__title').textContent = this._title;
    this._setEventListeners();
    return this._view;
}

}

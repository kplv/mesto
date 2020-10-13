export default class Card {

  constructor(data, template, api, {handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._api = api;
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

  _like() {
    this._likeButton.classList.toggle('element__like-button_liked');

  }

  _handleDeleteClick() {

  }

  _delete() {
    this._view.remove();
  }

  _setEventListeners() {
    this._likeButton = this._view.querySelector('.element__like-button');
    this._deleteButton = this._view.querySelector('.element__delete-button');
    this._image = this._view.querySelector('.element__image');
    this._likeCounter = this._view.querySelector('.element__likes');

    this._likeButton.addEventListener('click',() => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener('click',() => {
      this._handleDeleteClick();
    });

    this._image.addEventListener('click',() => {
      this._handleCardClick();
    });

  }

  get() {
    this._view = this._getTemplate();
    this._view.querySelector('.element__image').src = this._image;
    this._view.querySelector('.element__title').textContent = this._title;
    this._view.querySelector('.element__likes').textContent = Object.keys(this._likes).length

    this._setEventListeners();
    return this._view;
}

}

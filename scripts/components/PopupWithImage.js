import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(selector) {
    super(selector);
  }

  open(name, link) {
    super.open();
    this._selector.querySelector('.popup__place').textContent = name;
    this._selector.querySelector('.popup__image').src = link;
  }

}

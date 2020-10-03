export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
  }

  open() {
    this._selector.classList.add('popup_opened')
    this.setEventListeners();
  }

  close() {
    this._selector.classList.remove('popup_opened')
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {this.close()} });
  }

  _handleClickClose() {
    document.addEventListener('click', (evt) => {
      if (evt.target === document.querySelector('.popup_opened')) {this.close()}
    });
  }

  setEventListeners() {
    this._selector.querySelector('.popup__close-button').addEventListener('click', () => {this.close()})
    this._handleEscClose();
    this._handleClickClose()
  }

}

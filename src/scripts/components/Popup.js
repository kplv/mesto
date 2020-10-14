export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
    this._submitButton = this._selector.querySelector('.popup__submit-button')
    this._InitialText = this._selector.querySelector('.popup__submit-button').textContent;
  }

  open() {
    this._selector.classList.add('popup_opened');
    // const submitButton = this._selector.querySelector('.popup__submit-button')
    // submitButton.textContent = 'Сохранить'
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

  loading() {
    this._selector.querySelector('.popup__submit-button').textContent = 'Сохранение…'
    console.log(this._selector.querySelector('.popup__submit-button').textContent)
  }

  loaded() {
    this._selector.querySelector('.popup__submit-button').textContent = this._InitialText
  }

  setEventListeners() {
    this._selector.querySelector('.popup__close-button').addEventListener('click', () => {this.close()})
    this._handleEscClose();
    this._handleClickClose()
  }

}

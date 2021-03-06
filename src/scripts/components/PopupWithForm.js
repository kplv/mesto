import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(selector, {submit}) {
    super(selector);
    this._submit = submit;
    this._InitialText = this._selector.querySelector('.popup__submit-button').textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit();
    })
  }

  close() {
    super.close();
    this._selector.querySelector('.popup__container').reset();
  }

  getInputValues() {
    this._inputList = this._selector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setInputValues(data) {
    const nameInput = document.querySelector('.popup__input_name');
    const jobInput = document.querySelector('.popup__input_job');
    nameInput.value = data.name;
    jobInput.value = data.about;
  };

  loading() {
    this._selector.querySelector('.popup__submit-button').textContent = 'Сохранение…'
  }

  loaded() {
    this._selector.querySelector('.popup__submit-button').textContent = this._InitialText
  }

}

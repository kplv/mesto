let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let submitButton = popup.querySelector('.popup__submit-button');
let formElement = document.querySelector('.popup__container');

function statePopup (event) {

  if (popup.classList.contains('popup__opened')) {
    popup.classList.remove('popup_opened') }
    else {
      popup.classList.add('popup_opened')
    }

    let nameInput = formElement.querySelector('.popup__input_name'); // Воспользуйтесь инструментом .querySelector()
    let jobInput = formElement.querySelector('.popup__input_job'); // Воспользуйтесь инструментом .querySelector()

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

  }

  editButton.addEventListener('click', statePopup);
  closeButton.addEventListener('click', statePopup);

  function sendToServer (event) {
    event.preventDefault();
    popup.classList.remove('popup_opened');
  }

  function saveInfo (event) {

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
      profileJob.textContent = job;
  }

  submitButton.addEventListener('click', saveInfo);
  formElement.addEventListener('submit', sendToServer);

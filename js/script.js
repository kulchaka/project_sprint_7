const placesList = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button');
const popApp = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const form = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_type_name');
const inputLink = document.querySelector('.popup__input_type_link-url');
const editButton = document.querySelector('.user-info__place-edit');
const editPopUp = document.querySelector('.popup-edit');
const closeEditPopUp = document.querySelector('.popup-edit__close');
const popupImage = document.querySelector('.popup-image');
const closePopupImage = document.querySelector('.popup-image__close');
const inputEditName = document.querySelector('.popup-edit__input_type_name');
const editForm = document.querySelector('.popup-edit__form');
const inputEditDscr = document.querySelector('.popup-edit__input-dscr');
const userName = document.querySelector('.user-info__name');
const userInfo = document.querySelector('.user-info__job');
const editInfoButton = document.querySelector('.popup-edit__button');
const inputsNameEdit = document.querySelector('.popup-edit__input_type_name');
const inputsInfoEdit = document.querySelector('.popup-edit__input-dscr');

const submit = document.querySelector('#button');

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongLink: 'Здесь должна быть ссылка'
};

//Active Button

//EditButton
document.querySelectorAll('.popup-edit__form').forEach((elem) => {

  editInfoButton.classList.add('popup-edit__button_validate');

  elem.addEventListener('input', (event) => {
    if (elem.checkValidity()) {
      editInfoButton.classList.add('popup-edit__button_validate');
    } else {
      editInfoButton.classList.remove('popup-edit__button_validate');
    }
  });
});

//AddButton
document.querySelectorAll('.popup__form').forEach((elem) => {
  elem.addEventListener('input', (event) => {
    /*
     Можно лучше:
     - Удалить неиспользуемый параметр функции
    */
    if (elem.checkValidity()) {
      document.querySelector('.popup__button').classList.add('popup__button_validate');
    } else {
      document.querySelector('.popup__button').classList.remove('popup__button_validate');
    }
  });
});

// Edit Form Input
function editForms(event) {
  const field = event.target;

  /*
   Можно лучше:
   - Удалить неиспользуемый параметр функции
  */

  //Empty or Wrong Length
  if (event.target.dataset.id !== 'popup__link') {
    if (field.value.length === 0) {
      /*
       Можно лучше:
       - Использовать === для сравнения во избежание проблем с типами
      */
      field.setCustomValidity(errorMessages.empty);
    } else if (field.value.length < 2 || field.value.length > 30) {
      field.setCustomValidity(errorMessages.wrongLength);
    } else {
      field.setCustomValidity('');
      document.querySelector('.popup__button').classList.add('popup__button_validate');
    }
  } else {
    if (field.value.length === 0) {
      field.setCustomValidity(errorMessages.empty);
    } else {
      field.setCustomValidity('');
      document.querySelector('.popup__button').classList.add('popup__button_validate');
    }
  }

  document.querySelector(`.${event.target.dataset.id}-error`).textContent = field.validationMessage;
};

//Get Inputs Edit Name & Info
inputEditName.setAttribute('value', `${userName.textContent}`);
inputEditDscr.setAttribute('value', `${userInfo.textContent}`);

//Add Inputs Edit Name & Info
function addInfoPlaceCard(eve) {
  eve.preventDefault();

  //Add new inputs
  userName.textContent = inputEditName.value;
  userInfo.textContent = inputEditDscr.value;

  //close PopUp window after click
  editPopUp.classList.remove('popup-edit_is-opened');

};

// Add&Remove Like
function addLike(event) {
  event.target.classList.toggle('place-card__like-icon_liked');
};

// Delete card
function removeCard(event) {
  const placeCrd = event.target.closest('.place-card');

  placesList.removeChild(placeCrd);
};

//Create Card
const createPlaceCard = function (name, link) {
  const markup = `<div class="place-card">
  <div class="place-card__image">
    <button class="place-card__delete-icon"></button>
  </div>
  <div class="place-card__description">
    <h3 class="place-card__name"></h3>
    <button class="place-card__like-icon"></button>
  </div>
</div>`;

  const elem = document.createElement('div');

  elem.insertAdjacentHTML('afterbegin', markup);
  elem.querySelector('.place-card__name').textContent = name;
  elem.querySelector('.place-card__image').setAttribute('style', `background-image: url(${link})`);
  elem.querySelector('.place-card__image').dataset.url = link;

  return elem.firstElementChild;
};

const renderPlaceCard = function (name, link) {
  const newPlaceList = createPlaceCard(name, link);

  placesList.appendChild(newPlaceList);
};

//Click PlacesList Elements
function clickCradElemnts(event) {
  /*
   Можно лучше:
   - Изменить название CradElemnts -> CardElements
  */

  //Open Image Pop-UP
  if (event.target.classList.contains('place-card__image')) {
    /*
     Отлично:
     - используется event.target
    */
    openPopupImg(event);
  }

  // Add&Remove Like
  if (event.target.classList.contains('place-card__like-icon')) {
    addLike(event);
  }

  //Remove Card
  if (event.target.classList.contains('place-card__delete-icon')) {
    removeCard(event);
  }
}

//Open Image Pop-UP
function openPopupImg(event) {
  popupImage.classList.add('popup-image_is-opened');
  document.querySelector('.popup-image__picture').setAttribute('src', `${event.target.dataset.url}`);
}

//Close Image Pop-UP
function closeImagePopup() {
  popupImage.classList.remove('popup-image_is-opened');
};

// Open PopUp Form
function openPopUp(event) {
  document.querySelector(`.${event.target.dataset.id}`).classList.add(`${event.target.dataset.id}_is-opened`);
};

// Close PopUp Form
function closePopUpForm(event) {
  document.querySelector(`.${event.target.dataset.id}`).classList.remove(`${event.target.dataset.id}_is-opened`);
  document.querySelector('.popup__button').classList.remove('popup__button_validate');
  document.querySelector(`.${event.target.dataset.id}__form`).reset();

  if (event.target.dataset.id === 'popup-edit') {
    editInfoButton.classList.add('popup-edit__button_validate');

    inputEditName.setAttribute('value', `${userName.textContent}`);
    inputEditDscr.setAttribute('value', `${userInfo.textContent}`);
  }
  resetInputs(event);
};

//reset Inputs
function resetInputs(event) {
  document.querySelector(`.${event.target.dataset.id}__name-error`).textContent = '';

  if (event.target.dataset.id === 'popup-edit') {
    document.querySelector(`.${event.target.dataset.id}__info-error`).textContent = '';
  } else {
    document.querySelector(`.${event.target.dataset.id}__link-error`).textContent = '';
  }
}

//Send Form Card
function sendForm(event) {
  event.preventDefault();
  const inputs = [...form.elements]

  let isValidForm = true;

  inputs.forEach((elem) => {
    if (elem.id !== submit.id) {
      if (!validate(elem)) isValidForm = false;
    }
  });

  if (isValidForm) {
    renderPlaceCard(inputName.value, inputLink.value);
    popApp.classList.remove('popup_is-opened');
    document.querySelector('.popup__form').reset();
    document.querySelector('.popup__button').classList.remove('popup__button_validate');
  } else {
    return false;
  }
}

//Validation
function validate(element) {
  // console.log(element);
  const errorElem = document.querySelector(`#error-${element.id}`);

  if (!element.checkValidity()) {
    errorElem.textContent = errorMessages.empty;
    return false;
  }
  /*
   - Убрать ненужные комментарии
  */
  return true;
}

//Exit Form
function exitForm(event) {

  if (event.keyCode == 27) {
    if (document.querySelector('.popup_is-opened')) {
      document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
      document.querySelector('.popup__button').classList.remove('popup__button_validate');
      document.querySelector('.popup__form').reset();
      document.querySelector('.popup__name-error').textContent = '';
      document.querySelector('.popup__link-error').textContent = '';
    } else if (document.querySelector('.popup-edit_is-opened')) {
      document.querySelector('.popup-edit').classList.remove('popup-edit_is-opened');
      document.querySelector('.popup-edit__form').reset();
      document.querySelector('.popup-edit__name-error').textContent = '';
      document.querySelector('.popup-edit__info-error').textContent = '';
      inputEditName.setAttribute('value', `${userName.textContent}`);
      inputEditDscr.setAttribute('value', `${userInfo.textContent}`);
    } else {
      closeImagePopup();
    }
  }
}

placesList.addEventListener('click', clickCradElemnts);
closeButton.addEventListener('click', closePopUpForm);
addButton.addEventListener('click', openPopUp);
closeEditPopUp.addEventListener('click', closePopUpForm);
editButton.addEventListener('click', openPopUp);
closePopupImage.addEventListener('click', closeImagePopup);

inputsInfoEdit.addEventListener('input', editForms);
inputsNameEdit.addEventListener('input', editForms);
inputName.addEventListener('input', editForms);
inputLink.addEventListener('input', editForms);

editForm.addEventListener('submit', addInfoPlaceCard);
form.addEventListener('submit', sendForm);
document.querySelector('body').addEventListener('keydown', exitForm);


function dataLoading(arr) {
  arr.forEach((datas) => {
    renderPlaceCard(datas.name, datas.link);
  });
}

dataLoading(initialCards);

/*
 Что понравилось:
 - Код разбит на небольшие функции, у функций ясные имена
 - Попап «Новое место» валидируется
 - Используется всплытие и делегирование событий
 - Код откомментирован
 Можно лучше:
 - Убрать все ненужные комментарии (закомментированные участки кода)✅
 - Реализовать закрытие попапа на esc✅
 - Попап обновления профиля должен принимать текущие значения при открытии✅
 - Объеденить функции закрытия и открытия попапов😔
 - Заменить все '==' на '===' во избежании проблем с типами✅
 Надо исправить:
 Баг #1✅
 1) Открываем попап "Редактирования профиля"
 2) Удаляем текст из инпутов
 3) Закрываем попап через крестик
 4) Переоткрываем попап -> кнопка заблокированна, при нажатии возникают ошибки валидации
 Баг #2✅
 1) Открываем попап добавления карточки
 2) Добавляем карточку
 3) Переоткрываем попап -> кнопка добавления не заблокирована. но добавить нельзя
 Баг #3✅
 1) Открываем попап добавления карточки
 2) Добавляем текст во второй инпут до исчезновения ошибок валидации
 3) Удаляем текст до появления ошибки валидации "Это обязательное поле"
 4) Добавляем валидную ссылку -> ошибка валидации не ушла
 */
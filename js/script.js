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
/*
 Можно лучше:
 - Убрать неиспользуемую переменную
*/
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
     Надо исправить:✅
     - Функция обновления состояния кнопки должны обрабатываться вместе с валидацией инпутов.
    */
    if (elem.checkValidity()) {
      document.querySelector('.popup__button').classList.add('popup__button_validate');
    } else {
      document.querySelector('.popup__button').classList.remove('popup__button_validate');
    }
  });
});

// Edit Form
function editForms(event) {
  /*
    Надо исправить:✅
    - Валидация полей должна быть описана одной функцией
  */
  const field = event.target;
  // console.log(event.target.dataset.id);
  /*
   Надо исправить:✅
   - Переменная объявлена без оператора const или let
  */

  //Empty or Wrong Length
  if (event.target.dataset.id !== 'popup__link') {
    if (field.value.length == 0) {
      field.setCustomValidity(errorMessages.empty);
    } else if (field.value.length < 2 || field.value.length > 30) {
      field.setCustomValidity(errorMessages.wrongLength);
    } else {
      field.setCustomValidity('');
    }
  } else {
    if (field.value.length == 0) {
      field.setCustomValidity(errorMessages.empty);
    }
  }

  document.querySelector(`.${event.target.dataset.id}-error`).textContent = field.validationMessage;
};

//Get Inputs Edit Name & Info
inputEditName.setAttribute('value', `${userName.textContent}`);
inputEditDscr.setAttribute('value', `${userInfo.textContent}`);

//Add Inputs Edit Name & Info
function addInfoPlaceCard(eve) {
  /*
    Можно лучше:✅
    - Лучше вынести document.querySelector('.popup-edit__form') в переменную
  */
  eve.preventDefault();

  //Add new inputs
  userName.textContent = inputEditName.value;
  userInfo.textContent = inputEditDscr.value;

  //close PopUp window after click
  editPopUp.classList.remove('popup-edit_is-opened');

};

// Add&Remove Like
function addLike(event) {
  // console.log(event.target);
  // event.target.classList.add('place-card__like-icon_liked');
  event.target.classList.toggle('place-card__like-icon_liked');

};

// Delete card
function removeCard(event) {

  const placeCrd = event.target.closest('.place-card');
  // console.log(placeCrd);

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
  // console.log(event.target);
  document.querySelector('.popup-image__picture').setAttribute('src', `${event.target.dataset.url}`);
}

//Close Image Pop-UP
function closeImagePopup() {
  popupImage.classList.remove('popup-image_is-opened');
};

// Open PopUp Form
function openPopUp(event) {
  // console.log(event.target.dataset.id);
  document.querySelector(`.${event.target.dataset.id}`).classList.add(`${event.target.dataset.id}_is-opened`);
};

// Close PopUp Form
function closePopUpForm(event) {
  // console.log(event.target.dataset.id);
  document.querySelector(`.${event.target.dataset.id}`).classList.remove(`${event.target.dataset.id}_is-opened`);
  document.querySelector(`.${event.target.dataset.id}__form`).reset();

  if (event.target.dataset.id == 'popup-edit') {
    inputEditName.setAttribute('value', `${userName.textContent}`);
    inputEditDscr.setAttribute('value', `${userInfo.textContent}`);
  }
  resetInputs(event);
};

//reset Inputs
function resetInputs(event) {
  // console.log(event.target.dataset.id);
  document.querySelector(`.${event.target.dataset.id}__name-error`).textContent = '';

  if (event.target.dataset.id == 'popup-edit') {
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
    /*
     - Убрать все console.log()
    */
    return false;
  }
}

//Validation
function validate(element) {
  // console.log(element.id);
  const errorElem = document.querySelector(`#error-${element.id}`);
  // console.log(errorElem);
  if (!element.checkValidity()) {
    errorElem.textContent = errorMessages.empty;
    // console.log(errorElem.textContent);
    return false;
  }
  /*
   - Убрать ненужные комментарии
  */
  return true;
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
 - Убрать все ненужные комментарии
 - Хорошей практикой структурирования кода считается сначала объявление переменных, затем функций,
 затем назначение слушателей
 - Реализовать закрытие попапа на esc
 - Попап обновления профиля должен принимать текущие значения при открытии
 - Объеденить функции закрытия и открытия попапов
 Надо исправить:
 - //Валидация полей должна быть описана одной функцией. Назначены события инпут должны быть на две формы.✅
 - Баг #1✅
 1) Открываем попап "Новое место"
 2) Вписываем текст в инпуты до моммента появления ошибок валидации
 3) Закрываем попап через крестик
 4) Переоткрываем попап -> ошибки валидации не ушли
 */
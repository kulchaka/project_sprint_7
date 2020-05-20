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
const popupImgPicture = document.querySelector('.popup-image__content');
const inputEditName = document.querySelector('.popup-edit__input_type_name');
const inputEditDscr = document.querySelector('.popup-edit__input-dscr');
const userName = document.querySelector('.user-info__name');
const userInfo = document.querySelector('.user-info__job');
const editInfoButton = document.querySelector('.popup-edit__button');
const inputsNameEdit = document.querySelector('.popup-edit__input_type_name');
const inputsInfoEdit = document.querySelector('.popup-edit__input-dscr');
const errorPopupName = document.querySelector('.popup__name-error');
const errorPopupLink = document.querySelector('.popup__link-error');
const errorNameElem = document.querySelector('.popup-edit__name-error');
const errorInfoElem = document.querySelector('.popup-edit__info-error');





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
    if (elem.checkValidity()) {
      document.querySelector('.popup__button').classList.add('popup__button_validate');
    } else {
      document.querySelector('.popup__button').classList.remove('popup__button_validate');
    }
  });
});

//Validation
// const errorElem = inputsEdit.parentNode.querySelector(`#${inputsEdit.id}-error`);

// console.log(errorElem);

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongLink: 'Здесь должна быть ссылка'
};

//Card Add Form
inputName.addEventListener('input', (event) => {
  field = event.target;
  if (field.value.length == 0) {
    field.setCustomValidity(errorMessages.empty);
  } else if (field.value.length < 2 || field.value.length > 30) {
    field.setCustomValidity(errorMessages.wrongLength);
  } else {
    field.setCustomValidity('');
  }
  errorPopupName.textContent = field.validationMessage;
});

inputLink.addEventListener('input', (event) => {
  field = event.target;
  if (field.value.length == 0) {
    field.setCustomValidity(errorMessages.empty);
  } else {
    field.setCustomValidity('');
  }
  errorPopupLink.textContent = field.validationMessage;
});

// Edit Form
inputsNameEdit.addEventListener('input', (event) => {
  field = event.target;
  // console.log(field);

  //Empty or Wrong Length
  if (field.value.length == 0) {
    field.setCustomValidity(errorMessages.empty);
  } else if (field.value.length < 2 || field.value.length > 30) {
    field.setCustomValidity(errorMessages.wrongLength);
  } else {
    field.setCustomValidity('');
  }



  errorNameElem.textContent = field.validationMessage;
});

inputsInfoEdit.addEventListener('input', (event) => {
  field = event.target;
  // console.log(field);

  //Empty or Wrong Length
  if (field.value.length == 0) {
    field.setCustomValidity(errorMessages.empty);
  } else if (field.value.length < 2 || field.value.length > 30) {
    field.setCustomValidity(errorMessages.wrongLength);
  } else {
    field.setCustomValidity('');
  }

  errorInfoElem.textContent = field.validationMessage;
});


//Get Inputs Edit Name & Info
inputEditName.setAttribute('value', `${userName.textContent}`);
inputEditDscr.setAttribute('value', `${userInfo.textContent}`);

//Add Inputs Edit Name & Info
document.querySelector('.popup-edit__form').addEventListener('submit', (eve) => {
  eve.preventDefault();

  //Add new inputs
  userName.textContent = inputEditName.value;
  userInfo.textContent = inputEditDscr.value;

  //close PopUp window after click
  editPopUp.classList.remove('popup-edit_is-opened');

});


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
placesList.addEventListener('click', function (event) {

  //Open Image Pop-UP
  if (event.target.classList.contains('place-card__image')) {
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

});


//Open Image Pop-UP
function openPopupImg(event) {
  popupImage.classList.add('popup-image_is-opened');
  // console.log(event.target.dataset.url);
  document.querySelector('.popup-image__picture').setAttribute('src', `${event.target.dataset.url}`);

}

//Close Image Pop-UP
closePopupImage.addEventListener('click', () => {
  popupImage.classList.remove('popup-image_is-opened');
});

//Open EditPopup
editButton.addEventListener('click', () => {
  editPopUp.classList.add('popup-edit_is-opened');
});

//Close EditPopup
closeEditPopUp.addEventListener('click', () => {
  editPopUp.classList.remove('popup-edit_is-opened');
  // document.querySelector('.popup-edit__form').reset();
});

// Open PopUp form
addButton.addEventListener('click', () => {
  popApp.classList.add('popup_is-opened');
});

// Close PopUp form
closeButton.addEventListener('click', () => {
  popApp.classList.remove('popup_is-opened');
  document.querySelector('.popup__form').reset();
});

//Send Form 
form.addEventListener('submit', (event) => {
  event.preventDefault();

  isFormValid(event.target);

  renderPlaceCard(inputName.value, inputLink.value);

  popApp.classList.remove('popup_is-opened');
  document.querySelector('.popup__form').reset();
});

//is Form Valid
function isFormValid(form) {
  const inputs = [...form.elements];
  console.log(inputs);
}

function dataLoading(arr) {
  arr.forEach((datas) => {
    renderPlaceCard(datas.name, datas.link);
  });
}

dataLoading(initialCards);
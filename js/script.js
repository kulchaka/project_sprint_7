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



// Add&Remove Like
function addLike(event) {
  event.target.classList.toggle('place-card__like-icon_liked');
};

// Delete card
function removeCard(event) {
  // closest -- отлично!
  const placeCrd = event.currentTarget.closest('.place-card');
  // console.log(placeCrd);
  // Можно лучше
  // Перед удалением элемента снять слушатели
  placesList.removeChild(placeCrd);
};

//Create Card
const createPlaceCard = function (name, link) {
  const markup = `<div class="place-card">
  <div
    class="place-card__image"

  >
    <button class="place-card__delete-icon"></button>
  </div>
  <div class="place-card__description">
    <h3 class="place-card__name"></h3>
    <button class="place-card__like-icon"></button>
  </div>
</div>`;

  const elem = document.createElement('div');
  elem.insertAdjacentHTML('afterbegin', markup);


  //Open Image Pop-UP
  elem.querySelector('.place-card__image').addEventListener('click', openPopupImg);

  // Add&Remove Like

  elem.querySelector('.place-card__like-icon').addEventListener('click', addLike);

  // Delete card
  elem.querySelector('.place-card__delete-icon').addEventListener('click', removeCard);
  // Можно лучше
  // Лучше сначала настроить всю карту до конца, а потом ставить слушатели.
  elem.querySelector('.place-card__name').textContent = name;
  elem.querySelector('.place-card__image').setAttribute('style', `background-image: url(${link})`);
  elem.querySelector('.place-card__image').dataset.url = link;
  const imgLink = elem.querySelector('.place-card__image').dataset.url;



  return elem.firstElementChild;

};

// Можно лучше
// Стрелочные функции
// const renderPlaceCard = (name, link) => {....};
const renderPlaceCard = function (name, link) {
  const newPlaceList = createPlaceCard(name, link);

  placesList.appendChild(newPlaceList);
};



// Можно лучше (тоже настоятельная рекомендация)
// Эти два метода можно заменить одним если использовать classList.toggle


//Open Image Pop-UP
function openPopupImg(event) {
  popupImage.classList.add('popup-image_is-opened');
  popupImgPicture.setAttribute('style', `background-image: url(${event.target.dataset.url})`);

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
});

// Open PopUp form
addButton.addEventListener('click', () => {
  popApp.classList.add('popup_is-opened');
});

// Close PopUp form
closeButton.addEventListener('click', () => {
  popApp.classList.remove('popup_is-opened');
});

// Forms-inputs
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPlaceCard(inputName.value, inputLink.value);
  // Можно лучше
  // используйте метод формы reset()
  inputName.value = '';
  inputLink.value = '';


  popApp.classList.remove('popup_is-opened');

});

function dataLoading(arr) {
  arr.forEach((datas) => {
    renderPlaceCard(datas.name, datas.link);
  });
}

dataLoading(initialCards);

// Здравствуйте
// ## Итог

// - код работает, нет синтаксических и других ошибок
// - функционал, перечисленный в задании, работает (при перезагрузке на страницу добавляются
//   10 карточек, форма открывается и закрывается, можно добавить, удалить и лайкнуть карточку)
// - функционал работает без ошибок
// - карточку можно добавить нажав Enter, находясь в одном из текстовых полей
// - верное использование `let` и `const`
// - функции, декларированные как `function functionName() {}` не вызываются до того, как были объявлены

// Работа принята

// Можно лучше

// 1. const functionName = (params) => {....}
//
// 2. Не забывайте удалять слушатели с удаляемых элементов
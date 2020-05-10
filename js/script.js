const placesList = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button');
const popApp = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const form = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_type_name');
const inputLink = document.querySelector('.popup__input_type_link-url');


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




  // Add&Remove Like

  elem.querySelector('.place-card__like-icon').addEventListener('click', addLike);

  // Delete card
  elem.querySelector('.place-card__delete-icon').addEventListener('click', removeCard);
  // Можно лучше
  // Лучше сначала настроить всю карту до конца, а потом ставить слушатели.
  elem.querySelector('.place-card__name').textContent = name;
  elem.querySelector('.place-card__image').setAttribute('style', `background-image: url(${link})`);



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
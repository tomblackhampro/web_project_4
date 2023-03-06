import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import closePopup from "./utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const placesWrapper = document.querySelector(".places__list");
const addCardPopup = document.querySelector(".popup-add");
const profileForm = document.querySelector(".popup__form-profile");
const cardForm = document.querySelector(".popup__form-add");
const imagePopup = document.querySelector(".popup-image");
const image = document.querySelector(".popup__image");
const imageTitle = document.querySelector(".popup__title-img");
const cardNewTitle = document.querySelector("#title");
const imageNewElement = document.querySelector("#image-link");
const inputSelector = document.querySelector(".popup__input");
const submitButtonSelector = document.querySelector(".popup__button-save");
const inputErrorClass = document.querySelector("popup__input_type_error");
const inactiveButtonClass = document.querySelector("popup__button_disabled");
// Card template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

// popup open and close

// Render Functions
const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const imageElement = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  imageElement.src = data.link;
  imageElement.alt = data.name;
  cardTitle.textContent = data.name;

  function openImagePopup() {
    openPopup(imagePopup);
    image.src = data.link;
    image.alt = data.name;
    imageTitle.textContent = data.name;
  }

  deleteButton.addEventListener("click", (event) => {
    event.target.closest(".card").remove();
  });
  function togglelikeButton() {
    likeButton.classList.toggle("card__like-button_active");
  }
  likeButton.addEventListener("click", togglelikeButton);
  imageElement.addEventListener("click", openImagePopup);
  return cardElement;
};

cardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCardData = {
    name: cardNewTitle.value,
    link: imageNewElement.value,
    cardTemplate: cardTemplate,
  };
  renderCard(newCardData, placesWrapper);
  closePopup(addCardPopup);
  cardForm.reset();
  resetValidation;
});

const renderCard = (data, wrap) => {
  const cardInstance = new Card(
    { title: data.name, imgUrl: data.link },
    "#card-template"
  );
  const cardItem = wrap.prepend(cardInstance.generateCard());
};

initialCards.forEach((cardObject) => {
  renderCard(cardObject, placesWrapper);
});

const settings = {
  errorSelector: ".popup__error",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inputErrorClass: "popup__input_type_error",
  inactiveButtonClass: "popup__button_disabled",
  errorClass: "popup__error_visible",
};
const profileFormValidator = new FormValidator(settings, profileForm);
const cardFormValidator = new FormValidator(settings, cardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
// add infomation to submit

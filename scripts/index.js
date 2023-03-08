import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { closePopup, openPopup } from "./utils.js";
import { initialCards } from "./constants.js";

const placesWrapper = document.querySelector(".places__list");
const addCardPopup = document.querySelector(".popup-add");
const profileForm = document.querySelector(".popup__form-profile");
const cardForm = document.querySelector(".popup__form-add");
const image = document.querySelector(".popup__image");
const imageTitle = document.querySelector(".popup__title-img");
const cardNewTitle = document.querySelector("#title");
const imageNewElement = document.querySelector("#image-link");
const inputSelector = document.querySelector(".popup__input");
const submitButtonSelector = document.querySelector(".popup__button-save");
const inputErrorClass = document.querySelector("popup__input_type_error");
const inactiveButtonClass = document.querySelector("popup__button_disabled");
const editProfilePopup = document.querySelector(".popup-profile");
const openEditWindowButton = document.querySelector(".profile__rectangle-edit");
const nameShown = document.querySelector(".profile__title");
const nameTitle = document.querySelector("#name");
const nameDescription = document.querySelector("#about-me");
const descriptionShown = document.querySelector(".profile__description");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-me");
const closeButtons = document.querySelectorAll(".popup__close");
const openAddPopupButton = document.querySelector(".profile__rectangle-add");
// Card template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

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
  cardFormValidator.toggleButtonState();
});

const renderCard = (data, wrap) => {
  const cardInstance = new Card(
    { title: data.name, imgUrl: data.link },
    "#card-template"
  );
  wrap.prepend(cardInstance.generateCard());
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

function openProfileWindow() {
  openPopup(editProfilePopup);
  fillProfileInfo();
}

function openAddWindow() {
  openPopup(addCardPopup);
}

openEditWindowButton.addEventListener("click", openProfileWindow);
openAddPopupButton.addEventListener("click", openAddWindow);

function fillProfileInfo() {
  nameTitle.value = nameShown.textContent;
  nameDescription.value = descriptionShown.textContent;
}

// Popup Forms

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closePopup(editProfilePopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

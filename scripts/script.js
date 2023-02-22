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
const editProfilePopup = document.querySelector(".popup-profile");
const addCardPopup = document.querySelector(".popup-add");
const openEditWindowButton = document.querySelector(".profile__rectangle-edit");
const profileForm = document.querySelector(".popup__form-profile");
const cardForm = document.querySelector(".popup__form-add");
const cardButton = document.querySelector(".card__button");
const openAddPopupButton = document.querySelector(".profile__rectangle-add");
const closeButtons = document.querySelectorAll(".popup__close");
const imagePopup = document.querySelector(".popup-image");
const image = document.querySelector(".popup__image");
const imageTitle = document.querySelector(".popup__title-img");
const popupBackground = document.querySelectorAll(".popup__background");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-me");
const cardNewTitle = document.querySelector("#title");
const imageNewElement = document.querySelector("#image-link");
const nameShown = document.querySelector(".profile__title");
const descriptionShown = document.querySelector(".profile__description");
const inputSelector = document.querySelector(".popup__input");
const submitButtonSelector = document.querySelector(".popup__button-save");
const inputErrorClass = document.querySelector("popup__input_type_error");
const inactiveButtonClass = document.querySelector("popup__button_disabled");
// Card template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

// popup open and close
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
  popup.addEventListener("mousedown", closePopupOnRemoteClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
  popup.removeEventListener("mousedown", closePopupOnRemoteClick);
}

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".popup");
  // set the listener
  button.addEventListener("click", () => closePopup(popup));
});

// close the popup when the user presses the overlay
function closePopupOnRemoteClick(evt) {
  // target is the element on which the event happened
  // currentTarget is the popup
  // if they are the same then we should close the popup
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// close the popup when the user presses the escape key
function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    // search for an opened modal
    const openedPopup = document.querySelector(".popup_opened");
    // close it
    closePopup(openedPopup);
  }
}

function openProfileWindow() {
  openPopup(editProfilePopup);
  fillProfileInfo();
}

openEditWindowButton.addEventListener("click", openProfileWindow);
openAddPopupButton.addEventListener("click", function () {
  openPopup(addCardPopup);
});

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
  console.log(submitButtonSelector);
  setSubmitButtonState(
    cardForm,
    validationConfig.submitButtonSelector,
    validationConfig.inputSelector,
    validationConfig.inactiveButtonClass
  );
});

const renderCard = (data, wrap) => {
  const cardItem = getCardElement(data);
  wrap.prepend(cardItem);
};

initialCards.forEach((cardObject) => {
  renderCard(cardObject, placesWrapper);
});

// add infomation to submit
function fillProfileInfo() {
  document.querySelector("#name").value = nameShown.textContent;
  document.querySelector("#about-me").value = descriptionShown.textContent;
}

// Popup Forms

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closePopup(editProfilePopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

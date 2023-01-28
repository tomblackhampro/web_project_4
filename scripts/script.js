const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const placesWrapper = document.querySelector(".places__list");
const profilePopup = document.querySelector(".popup-profile");
const addPopup = document.querySelector(".popup-add");
const openEditWindowButton = document.querySelector(".profile__rectangle-edit");
const profileForm = document.querySelector(".popup__form-profile");
const cardButton = document.querySelector(".card__button");
const openAddPopupButton = document.querySelector(".profile__rectangle-add");
const closeButtons = document.querySelectorAll('.popup__close');
const imagePopup = document.querySelector(".popup-image");


// popup open and close

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach((button) => {
  // find the closest popup 
  const popup = button.closest('.popup');
  // set the listener
  button.addEventListener('click', () => closePopup(popup));
});

function toggleOpenWindow() {
  profilePopup.classList.toggle("popup_opened");
  addInfo();
}

function toggleOpenAddPopup() {
  addPopup.classList.toggle("popup_opened");
}

// Card template

const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

// Render Functions
const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const imageElement = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  imageElement.src = `${data.link}`;
  imageElement.alt = "picture";
  cardTitle.textContent = data.name;

  function openImagePopup() {
    openPopup(imagePopup);
    const img = document.querySelector(".popup__image");
    const imageTitle = document.querySelector(".popup__title-img");
    img.src =  data.link;
    imageTitle.textContent = data.name;
  };
  
  deleteButton.addEventListener("click", (event) =>{
    event.target.parentNode.remove();
  })
  function togglelikeButton() {
    likeButton.classList.toggle("card__like-button_active");
  }
  likeButton.addEventListener("click", togglelikeButton);
  imageElement.addEventListener("click", openImagePopup);
  return cardElement
};

const addCard = document.querySelector(".popup__form-add");

addCard.addEventListener("submit", (e) => {
  e.preventDefault();
  const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
  const cardNewTitle = document.querySelector("#title").value;
  const imageNewElement  = document.querySelector("#image-link").value;
  const newCardData = {
    name: cardNewTitle,
    link: imageNewElement,
    cardTemplate: cardTemplate
  };
  renderCard(newCardData, placesWrapper);
  closePopup(addPopup);
  addCard.reset();
});

const renderCard = (data, wrap) => {
  const cardItem = getCardElement(data);
  wrap.prepend(cardItem);
};

initialCards.forEach((cardObject) => {
  renderCard(cardObject, placesWrapper);
});


// add infomation to submit
function addInfo() {
  const nameShown = document.querySelector(".profile__title").textContent;
  const descriptionShown = document.querySelector(".profile__description").textContent;
  document.querySelector("#name").value = nameShown;
  document.querySelector("#about-me").value = descriptionShown;
};

openEditWindowButton.addEventListener("click", toggleOpenWindow);
openAddPopupButton.addEventListener("click", toggleOpenAddPopup);

// Popup Forms

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector("#name").value;
  const jobInput = document.querySelector("#about-me").value;
  document.querySelector(".profile__title").textContent= nameInput;
  document.querySelector(".profile__description").textContent = jobInput;
  closePopup(profilePopup);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);
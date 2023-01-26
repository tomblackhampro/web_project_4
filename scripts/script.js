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

// Card template

const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

// Render Functions
const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const imageElement = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const imagePopup = document.querySelector(".popup-image");
  const imagePopupClose = document.querySelector(".popup__button-close-image");
  imageElement.style.backgroundImage = "url(" + data.link + ")";
  cardTitle.innerHTML = data.name;
  
  deleteButton.addEventListener("click", (event) =>{
    event.target.parentNode.remove();
  })
  function togglelikeButton() {
    likeButton.classList.toggle("card__like-button_active");
  }
  likeButton.addEventListener("click", togglelikeButton);

  function openImagePopup() {
    imagePopup.classList.toggle("popup-image-active");
    const img = document.querySelector(".popup-image__image");
    const imageTitle = document.querySelector(".popup-image__title");
    img.src =  data.link;
    imageTitle.innerHTML = data.name;
  };
  function closeImagePopup() {
    imagePopup.classList.remove("popup-image-active");
  };

  imageElement.addEventListener("click", openImagePopup);
  imagePopupClose.addEventListener("click", closeImagePopup);


  return cardElement
};



const getNewCardElement = (data) => {
  const cardTitle = document.querySelector("#title").value;
  const imageElement = document.querySelector("#image-link").value;
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  deleteButton.addEventListener("click", (event) =>{
    event.target.parentNode.remove();
  })
  function togglelikeButton() {
    likeButton.classList.toggle("card__like-button_active");
  }
  likeButton.addEventListener("click", togglelikeButton);

  function openImagePopup() {
    imagePopup.classList.toggle("popup-image-active");
    const img = document.querySelector(".popup-image__image");
    const imageTitle = document.querySelector(".popup-image__title");
    img.src =  data.link;
    imageTitle.innerHTML = data.name;
  };
  function closeImagePopup() {
    imagePopup.classList.remove("popup-image-active");
  };

  imageElement.addEventListener("click", openImagePopup);
  imagePopupClose.addEventListener("click", closeImagePopup);
  console.log(cardElement);
  return cardElement
}

const renderNewCard = (data, wrap) => {
  const cardNewItem = getNewCardElement(data);
  wrap.prepend(cardItem);
};

const renderCard = (data, wrap) => {
  const cardItem = getCardElement(data);
  wrap.prepend(cardItem);
};

initialCards.forEach((cardObject) => {
  renderCard(cardObject, placesWrapper);
});


const modalWindow = document.querySelector(".popup");
const addWindow = document.querySelector(".popup-add");
const openEditWindowButton = document.querySelector(".profile__rectangle-edit");
const closeEditWindowButton = document.querySelector(".popup__button-close");
const cardButton = document.querySelector(".card__button");
const openAddWindowButton = document.querySelector(".profile__rectangle-add");
const closeAddWindowButton = document.querySelector(".popup__button-close-add");


// add infomation to submit
function addInfo() {
  let nameShown = document.querySelector(".profile__title").textContent;
  let descriptionShown = document.querySelector(".profile__description").textContent;
  document.querySelector("#name").value = nameShown;
  document.querySelector("#about-me").value = descriptionShown;
};

function addInfo2() {
  document.querySelector("#title").value = titleValue;
  document.querySelector("#image-link").value = linkValue;
};

function toggleCloseWindow() {
  modalWindow.classList.toggle("popup_active");
}

function toggleOpenWindow() {
  modalWindow.classList.toggle("popup_active");
  addInfo();
}

function toggleOpenAddWindow() {
  addWindow.classList.toggle("popup_active-add");
  
}

function toggleCloseAddWindow() {
  addWindow.classList.toggle("popup_active-add");
}


openEditWindowButton.addEventListener("click", toggleOpenWindow);
closeEditWindowButton.addEventListener( "click", toggleCloseWindow);
openAddWindowButton.addEventListener("click", toggleOpenAddWindow);
closeAddWindowButton.addEventListener( "click", toggleCloseAddWindow);

// Popup Forms

let formElement = document.querySelector(".popup__form");
let formElementAdd = document.querySelector(".popup__form-add");

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    initialCards.forEach((cardObject) => {
      renderNewCard(cardObject, placesWrapper);
    });
    toggleCloseWindow();
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  let titleInput = document.querySelector("#title").value;
  let linkInput = document.querySelector("#image-link").value;
  document.querySelector(".profile__title").textContent= nameInput;
  document.querySelector(".profile__description").textContent = jobInput;
  toggleCloseAddWindow();
}


formElement.addEventListener('submit', handleCardFormSubmit);
formElement.addEventListener('submit', handleProfileFormSubmit);
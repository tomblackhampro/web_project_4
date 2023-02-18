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
const addCard = document.querySelector(".popup__form-add");
const cardButton = document.querySelector(".card__button");
const openAddPopupButton = document.querySelector(".profile__rectangle-add");
const closeButtons = document.querySelectorAll('.popup__close');
const imagePopup = document.querySelector(".popup-image");
const img = document.querySelector(".popup__image");
const imageTitle = document.querySelector(".popup__title-img");
const popupBackground = document.querySelectorAll(".popup__background");
// Card template
const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");


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

// close the popup when the user presses the overlay
popupBackground.forEach((background) => {
  background.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      const popup = background.closest('.popup');
      closePopup(popup);
    }
  });
});

// close the popup when the user presses the escape key
document.addEventListener('keyup', (event) => {
  // if the key pressed is the escape key
  if (event.key === 'Escape') {
    // find all the open popups
    const popups = document.querySelectorAll('.popup_opened');
    // iterate through the popups and close them
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
});


function toggleOpenProfileWindow() {
  openPopup(profilePopup);
  addInfo();
}

openEditWindowButton.addEventListener("click", toggleOpenProfileWindow);
openAddPopupButton.addEventListener("click", function(){
  openPopup(addPopup);
});


// Render Functions
const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const imageElement = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  imageElement.src = `${data.link}`;
  imageElement.alt = data.name;
  cardTitle.textContent = data.name;

  function openImagePopup() {
    openPopup(imagePopup);
    img.src =  data.link;
    img.alt = data.name;
    imageTitle.textContent = data.name;
  };
  
  deleteButton.addEventListener("click", (event) =>{
    event.target.closest('.card').remove();
  })
  function togglelikeButton() {
    likeButton.classList.toggle("card__like-button_active");
  }
  likeButton.addEventListener("click", togglelikeButton);
  imageElement.addEventListener("click", openImagePopup);
  return cardElement
};



addCard.addEventListener("submit", (e) => {
  e.preventDefault();
  const cardNewTitle = document.querySelector("#title").value;
  let imageNewElement  = document.querySelector("#image-link").value;
  /*const fallbackImage = 'https://images.unsplash.com/photo-1666705040497-1890be6e357c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
  if (imageNewElement.match(/\.(jpg|jpeg|png|gif)$/)) {
    console.log('Valid image')
  } else {
    console.log('Invalid image')
    imageNewElement = fallbackImage;
  }*/
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
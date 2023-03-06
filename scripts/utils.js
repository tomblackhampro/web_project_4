const editProfilePopup = document.querySelector(".popup-profile");
const addCardPopup = document.querySelector(".popup-add");
const openEditWindowButton = document.querySelector(".profile__rectangle-edit");
const profileForm = document.querySelector(".popup__form-profile");
const nameShown = document.querySelector(".profile__title");
const descriptionShown = document.querySelector(".profile__description");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-me");
const closeButtons = document.querySelectorAll(".popup__close");
const openAddPopupButton = document.querySelector(".profile__rectangle-add");

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

export default closePopup;

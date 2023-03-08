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

export { openPopup, closePopup };

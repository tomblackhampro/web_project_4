const modalWindow = document.querySelector(".popup");
const openEditWindowButton = document.querySelector(".profile__rectangle-edit");
const closeEditWindowButton = document.querySelector(".popup__button-close");

function addInfo() {
  let nameShown = document.querySelector(".profile__title").textContent;
  let descriptionShown = document.querySelector(".profile__description").textContent;
  document.querySelector(".popup__input-name").value = nameShown;
  document.querySelector(".popup__input-description").value = descriptionShown;
};

function toggleCloseWindow() {
  modalWindow.classList.toggle("popup_active");
}

function toggleOpenWindow() {
  modalWindow.classList.toggle("popup_active");
  addInfo();
}

openEditWindowButton.addEventListener("click", toggleOpenWindow);
closeEditWindowButton.addEventListener( "click", toggleCloseWindow);

let formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    // Having done so, we can define our own way of submitting the form.
    // We'll explain it in more detail later.

    // Let's find the form fields in the DOM
    let nameInput = document.querySelector(".popup__input-name").value;
    let jobInput = document.querySelector(".popup__input-description").value;

    // Get the values of each field from the corresponding value property
    // Select elements where the field values will be entered
    document.querySelector(".profile__title").textContent= nameInput;
    document.querySelector(".profile__description").textContent = jobInput;
    // Insert new values using the textContent 
    // property of the querySelector() method
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit);
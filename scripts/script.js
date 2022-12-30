const modalWindow = document.querySelector(".popup");
const openEditWindowButton = document.querySelector(".profile__rectangle-edit");
const closeEditWindowButton = document.querySelector(".popup__button-close");



function toggleEditWindow() {
  modalWindow.classList.toggle("popup__opened")
}

openEditWindowButton.addEventListener("click", toggleEditWindow);
closeEditWindowButton.addEventListener( "click", toggleEditWindow);



function addInfo() {
  const name = document.querySelector(".profile__title").innerHTML;
  const description = document.querySelector(".profile__description").innerHTML;
  document.querySelector(".popup__input-name").value = name;
  document.querySelector(".popup__input-description").value = description;
};

addInfo();
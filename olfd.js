const enableValidation = (props) => {
  const { formSelector, inputSelector, validationCallBack, inputErrorClass, inactiveButtonClass, submitButtonSelector } = props;
  if (formSelector) {
    const form = document.querySelector(formSelector);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    const inputs = document.querySelectorAll(inputSelector);
    inputs.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        
      });
    });

  }


const checkValidity = (inputItem) => {
  return inputItem.value.includes("4");
}

const showError = (props) => {
  const { inputItem, inputErrorClass, submitButtonSelector, inactiveButtonClass, formSelector, inputSelector } = props;
  inputItem.classList.add(inputErrorClass);
  const errorMessage = inputItem.closest(formSelector).querySelector(`#${inputItem.id}-error`);
  errorMessage.textContent = inputItem.validationMessage;
} 

const hideError = (props) => {
  const { inputItem, inputErrorClass, submitButtonSelector, inactiveButtonClass, formSelector, inputSelector } = props;
  inputItem.classList.remove(inputErrorClass);
  const errorMessage = inputItem.closest(formSelector).querySelector(`#${inputItem.id}-error`);
  errorMessage.textContent = "";
}


const setEventListeners = () => {
  const form = document.querySelector('.popup__form');
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector('.popup__button');
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      setSubmitButtonState('.popup__form', '.popup__button', '.popup__input', 'popup__button_disabled');
    });
  });
};
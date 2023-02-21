const showError = ({ inputItem, errorClass, formSelector }) => {
  // inputItem.closest(formSelector) doesn't work in the code
  const formParent = inputItem.parentElement;
  const errorItem = formParent.querySelector(`.${inputItem.id}-error`);
  errorItem.textContent = inputItem.validationMessage;
  errorItem.classList.add(errorClass);
}

const hideError = ({ inputItem, errorClass, formSelector }) => {
  const formParent = inputItem.parentElement;
  const errorItem = formParent.querySelector(`.${inputItem.id}-error`);
  errorItem.textContent = "";
  errorItem.classList.remove(errorClass);
}

const toggleInputError = (inputItem, inputErrorClass, errorClass, formSelector) => {
  if (!inputItem.validity.valid) {
    showError({
      inputItem, errorClass, formSelector
    });
    inputItem.classList.add(inputErrorClass);
    } else {
    hideError({
      inputItem, errorClass, formSelector
    });
    inputItem.classList.remove(inputErrorClass);
  };
};

const checkFormValidity = (formSelector, inputSelector) => {
  const inputList = [...formSelector.querySelectorAll(inputSelector)];
  const isFormValid = inputList.every((inputItem) => {
    return inputItem.validity.valid;
  });
  return isFormValid;
};

const setSubmitButtonState = (form, submitButtonSelector, inputSelector, inactiveButtonClass) => {
  const button = form.querySelector(submitButtonSelector);
  if (!checkFormValidity(form, inputSelector)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
};


const enableValidation = (props) => {
  const { formSelector, inputSelector, inputErrorClass, inactiveButtonClass, submitButtonSelector, errorClass } = props;
  const formList = document.querySelectorAll(formSelector);
  setSubmitButtonState(form, submitButtonSelector, inputSelector, inactiveButtonClass);
  formList.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      const inputs = form.querySelectorAll(inputSelector);
      inputs.forEach((inputItem) => {
        inputItem.addEventListener("input", () => { 
          toggleInputError(inputItem, inputErrorClass, errorClass, formSelector);
          setSubmitButtonState(form, submitButtonSelector, inputSelector, inactiveButtonClass);
        });
      });
  });
};

enableValidation({
  errorSelector: ".popup__error",
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inputErrorClass: "popup__input_type_error",
  inactiveButtonClass: "popup__button_disabled",
  errorClass: "popup__error_visible",
});
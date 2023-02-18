const showError = ({ inputItem, inputErrorClass, errorClass }) => {
  inputItem.classList.add(inputErrorClass);
  const formParent = inputItem.parentElement;
  const errorItem = formParent.querySelector(`.${inputItem.id}-error`);
  errorItem.textContent = inputItem.validationMessage;
  errorItem.classList.add(errorClass);
}

const hideError = ({ inputItem, inputErrorClass, errorClass }) => {
  inputItem.classList.remove(inputErrorClass);
  const formParent = inputItem.parentElement;
  const errorItem = formParent.querySelector(`.${inputItem.id}-error`);
  errorItem.textContent = "";
  errorItem.classList.remove(errorClass);
}

const toggleInputError = (inputItem, inputErrorClass, submitButtonSelector, inactiveButtonClass, form, inputSelector) => {
  if (!inputItem.validity.valid) {
    showError({
      inputItem, inputErrorClass, inactiveButtonClass, inputSelector
    });
    } else {
    hideError({
      inputItem, inputErrorClass, inactiveButtonClass, inputSelector
    });
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
  const { formSelector, inputSelector, validationCallBack, inputErrorClass, inactiveButtonClass, submitButtonSelector } = props;
  const formList = document.querySelectorAll(formSelector);
  setSubmitButtonState(form, submitButtonSelector, inputSelector, inactiveButtonClass);
  formList.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      const inputs = document.querySelectorAll(inputSelector);
      inputs.forEach((inputItem) => {
        inputItem.addEventListener("input", () => { 
          toggleInputError(inputItem, inputErrorClass, submitButtonSelector, inactiveButtonClass, form, inputSelector);
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
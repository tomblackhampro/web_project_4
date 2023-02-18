const showError = (props) => {
  const { inputItem, inputErrorClass, errorClass } = props;
  inputItem.classList.add(inputErrorClass);
  const formParent = inputItem.parentElement;
  const errorItem = formParent.querySelector(`.${inputItem.id}-error`);
  console.log(`${errorItem} error`);
  errorItem.textContent = inputItem.validationMessage;
  errorItem.classList.add(errorClass);
}

const hideError = (props) => {
  const { inputItem, inputErrorClass, errorClass} = props;
  inputItem.classList.remove(inputErrorClass);
  const formParent = inputItem.parentElement;
  const errorItem = formParent.querySelector(`.${inputItem.id}-error`);
  console.log(`${errorItem} no error`);
  errorItem.textContent = "";
  errorItem.classList.remove(errorClass);
}

const checkInputValidity = (inputItem, inputErrorClass, submitButtonSelector, inactiveButtonClass, form, inputSelector) => {
  if (!inputItem.validity.valid) {
    showError({
      inputItem, inputErrorClass, inactiveButtonClass, inputSelector
    });
    } else {
    hideError({
      inputItem, inputErrorClass, inactiveButtonClass, inputSelector
    });
  }
  setSubmitButtonState(form, submitButtonSelector, inputSelector, inactiveButtonClass);
};

const checkFormValidity = (formSelector, inputSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
  const checkAllInputValidity = inputList.every((inputItem) => {
    return inputItem.validity.valid;
  });
  return checkAllInputValidity;
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
  formList.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      const inputs = document.querySelectorAll(inputSelector);
      inputs.forEach((inputItem) => {
        inputItem.addEventListener("input", () => {
          const isValid = validationCallBack(inputItem, inputErrorClass, submitButtonSelector, inactiveButtonClass, form, inputSelector);
          if(isValid) {
            // console.log("Field ", inputItem.name, " is valid");
            hideError({
              inputItem, inputErrorClass, inactiveButtonClass, inputSelector
            });
          } else {
            // console.log("Field ", inputItem.name, " is not valid");n
            showError({
              inputItem, inputErrorClass, inactiveButtonClass, inputSelector
            });
          }
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
  validationCallBack: checkInputValidity,
});
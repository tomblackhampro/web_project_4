class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._button = this._formElement.querySelector(this._submitButtonSelector);
  }

  _setEventListeners() {
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        this._checkInputValidity(inputItem);
        this.toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputItem) {
    if (!inputItem.validity.valid) {
      this._showError(inputItem);
    } else {
      this._hideError(inputItem);
    }
    this.toggleButtonState();
  }

  _showError(inputItem) {
    const errorElement = this._formElement.querySelector(
      `.${inputItem.id}-error`
    );
    console.log(errorElement);
    errorElement.textContent = inputItem.validationMessage;
    errorElement.classList.add(this._errorClass);
    inputItem.classList.add(this._inputErrorClass);
  }

  _hideError(inputItem) {
    const errorElement = this._formElement.querySelector(
      `.${inputItem.id}-error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputItem.classList.remove(this._inputErrorClass);
  }

  _checkFormValidity = () =>
    this._inputList.every((input) => input.validity.valid);

  toggleButtonState() {
    const isFormValid = this._checkFormValidity();
    if (isFormValid) {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    } else {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    }
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this.toggleButtonState();
  }
}

export default FormValidator;

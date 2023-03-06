class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
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
    this._button.disabled = true;
    this._button.classList.add(this._inactiveButtonClass);
    this._setEventListeners();
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._formElement.addEventListener("input", (e) => {
      this._checkInputValidity(e.target);
    });
  }

  _checkInputValidity(inputItem) {
    if (!inputItem.validity.valid) {
      this._showError(inputItem);
    } else {
      this._hideError(inputItem);
    }
    this._toggleButtonState();
  }

  _showError(inputItem) {
    const errorElement = this._formElement.querySelector(
      `#${inputItem.id}-error`
    );
    errorElement.textContent = inputItem.validationMessage;
    errorElement.classList.add(this._errorClass);
    inputItem.classList.add(this._inputErrorClass);
  }

  _hideError(inputItem) {
    console.log(inputItem.id);
    const errorElement = this._formElement.querySelector(
      `.${inputItem.id}-error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputItem.classList.remove(this._inputErrorClass);
  }

  _toggleButtonState() {
    if (!this._formElement.querySelector(`${this._inputSelector}:invalid`)) {
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
    this._toggleButtonState();
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        this._checkInputValidity(inputItem);
        this._toggleButtonState();
      });
    });
  }
}

export default FormValidator;

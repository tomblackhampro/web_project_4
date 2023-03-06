const cardImageClassSelector = ".card__image";
const cardTitleClassSelector = ".card__title";
const cardClassSelector = ".card";
const cardLikeButtonSelector = ".card__like-button";
const cardDeleteButton = ".card__delete-button";

class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._imgUrl = data.imgUrl;
    this._cardSelector = cardSelector;
    this._deleteButton = cardDeleteButton;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(cardClassSelector)
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(cardDeleteButton)
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(cardLikeButtonSelector)
      .addEventListener("click", () => {
        this._toggleLike();
      });
  }
  _;

  _deleteCard() {
    this._element.remove();
  }

  _toggleLike() {
    this._element
      .querySelector(cardLikeButtonSelector)
      .classList.toggle("card__like-button_active");
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(
      cardImageClassSelector
    ).style.backgroundImage = `url(${this._imgUrl})`;
    this._element.querySelector(cardTitleClassSelector).textContent =
      this._title;

    return this._element;
  }
}

export default Card;

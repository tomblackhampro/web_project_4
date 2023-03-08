import { openPopup } from "./utils.js";
import {
  cardImage,
  image,
  imagePopup,
  imageTitle,
  cardClassSelector,
  cardImageClassSelector,
  cardLikeButtonSelector,
  cardDeleteButtonSelector,
  cardTitleClassSelector,
} from "./constants.js";

class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._imgUrl = data.imgUrl;
    this._cardSelector = cardSelector;
    this._deleteButton = cardDeleteButtonSelector;
    this._cardImage = cardImage;
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
      .querySelector(cardImage)
      .addEventListener("click", this._openImagePopup);
    this._element
      .querySelector(cardDeleteButtonSelector)
      .addEventListener("click", this._deleteCard);
    this._element
      .querySelector(cardLikeButtonSelector)
      .addEventListener("click", this._toggleLike);
  }
  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _toggleLike = () => {
    this._likeButton = this._element.querySelector(cardLikeButtonSelector);
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _openImagePopup = () => {
    image.src = this._imgUrl;
    image.alt = this._title;
    imageTitle.textContent = this._title;
    openPopup(imagePopup);
  };

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(cardImageClassSelector).src = this._imgUrl;
    this._element.querySelector(cardTitleClassSelector).textContent =
      this._title;
    this._element.querySelector(
      cardImageClassSelector
    ).alt = `Photo of ${this._title}`;
    this._setEventListeners();

    return this._element;
  }
}

export default Card;

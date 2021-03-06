const RoomsType = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
  HOTEL: 'Отель'
};

const addContent = (element, value) => {
  if (value && !value.includes('undefined'))  {
    element.textContent = value;
  } else {
    element.remove();
  }
};

const createPhotos = (gallery, photos) => {
  photos.forEach((item) => {
    const cardPhoto = document.createElement('img');

    cardPhoto.classList.add('popup__photo');
    cardPhoto.src = item;
    cardPhoto.width = 45;
    cardPhoto.height = 40;
    cardPhoto.alt = 'Фотография жилья';

    gallery.appendChild(cardPhoto);
  });
};

const createFeatures = (featuresList, features) => {
  features.map((item) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', `popup__feature--${item}`);
    featureItem.textContent = item;

    featuresList.appendChild(featureItem);
  });
};

const renderCard = ({author, offer}) => {

  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);
  const featuresList = cardElement.querySelector('.popup__features');
  const gallery = cardElement.querySelector('.popup__photos');

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').insertAdjacentHTML('afterbegin', `${offer.price} `);

  addContent(cardElement.querySelector('.popup__type'), RoomsType[offer.type.toUpperCase()]);
  addContent(cardElement.querySelector('.popup__description'), offer.description);
  addContent(cardElement.querySelector('.popup__text--capacity'), `${offer.rooms} комнаты для ${offer.guests} гостей`);
  addContent(cardElement.querySelector('.popup__text--time'), `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

  if (offer.features) {
    featuresList.innerHTML = '';
    createFeatures(featuresList, offer.features);
  } else {
    featuresList.remove();
  }

  if (offer.photos) {
    gallery.innerHTML = '';
    createPhotos(gallery, offer.photos);
  } else {
    gallery.remove();
  }

  return cardElement;
};

export {renderCard};

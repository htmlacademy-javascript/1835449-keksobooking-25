import {createCards} from './mock.js';

const TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало' ,
  hotel: 'Отель'
};

const map = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarCards = createCards();

const similarListFragment = document.createDocumentFragment();

similarCards.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementChildren = cardElement.children;
  const cardElementChildrenArray = Array.from(cardElementChildren);
  const cardElementPhotoContainer = cardElement.querySelector('.popup__photos');
  const cardElementPhotoTemplate = cardElement.querySelector('.popup__photo');
  cardElementPhotoContainer.textContent = '';
  const cardElementFeaturesContainer = cardElement.querySelector('.popup__features');
  const cardElementFeaturesList = cardElementFeaturesContainer.querySelectorAll('.popup__feature');
  const offerFeatures = offer.features;

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML =  `${offer.price ? offer.price : 'Данные отсутствуют'} <span>₽/ночь</span>`;
  cardElement.querySelector('.popup__type').textContent = TYPES.find((type) => Object.keys(type).includes(offer.type))[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms ? offer.rooms : 'Данные отсутствуют'} комнаты для ${offer.guests ? offer.guests : 'Данные отсутствуют'} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin ? offer.checkin : 'Данные отсутствуют'}, выезд до ${offer.checkout ? offer.checkout : 'Данные отсутствуют'}`;

  cardElementFeaturesList.forEach((cardElementFeatureItem) => {
    const isNecessary = offerFeatures.some((offerFeature) => {
      cardElementFeatureItem.classList.contains(`popup__feature--${offerFeature}`);
    });
    if (!isNecessary) {
      cardElementFeatureItem.remove();
    }
  });
  cardElement.querySelector('.popup__description').textContent = offer.description;

  offer.photos.forEach((photo) => {
    const photoElement = cardElementPhotoTemplate.cloneNode();
    photoElement.src = photo;
    cardElementPhotoContainer.append(photoElement);
  });

  cardElement.querySelector('.popup__avatar').src = author.avatar;

  cardElementChildrenArray.forEach((child) => {
    if (child.textContent.includes('Данные отсутствуют') || (!child.textContent && !child.src && child.children.length === 0)) {
      const childClasses = Array.from(child.classList).join('.');
      const notNecessaryChild = cardElement.querySelector(`.${childClasses}`);
      notNecessaryChild.remove();
    }
  });
  similarListFragment.appendChild(cardElement);
});
map.appendChild(similarListFragment.firstElementChild);

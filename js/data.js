import {getRandomPositiveNumber, getRandomFloatNumber, getRandomElement, getRandomArray} from './utils.js';

const COUNT_ADS = 10;

const OFFER_TITLES = [
  'Отель в центре люкс-класса',
  'Отель эконом-класса',
  'Номер в отеле "Для двоих"',
  'Дом с контактным зоопарком',
  'Дом на краю города',
  'Квартира рядом с парком',
  'Дворец около моря',
  'Дом "Для друзей"',
  'Бунгало для вечеринок',
  'Коммунальная квартира'
];

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

const PRICE = 50000;

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const COUNT_ROOMS = 8;

const COUNT_GUESTS = 5;

const TIME_VARIANTS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'Две жилые комнаты, санузел, мини-бар, телевизор и сейф, трансфер от точки прибытия',
  'В номере 2 кровати, минимальный набор предметов быта',
  'Wi-Fi, завтрак и чай, кондиционер, парковка с видеонаблюдением',
  'На территории дома расположен контактный зоопарк, который можно посещать в любое время до 23:00',
  'Маленький и уют дом с красивым видом из окна, где вас никто не потревожит',
  'Свежий воздух и возможность устроить пикники прямо рядом с домом',
  'Богатый дворец со всем необходимым, включая обслуживающий персонал',
  'Здесь вы сможете отдохнуть компанией друзей, предоставляются развлекательные устройства по запросу',
  'Есть оборудование для вечеринки, возможно заказать обслуживающий персонал',
  'Проходная квартира с холодильником, стиральной машиной и телевизором'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createCard = (index) => {
  const lat = getRandomFloatNumber(MIN_LAT, MAX_LAT, 5);
  const lng = getRandomFloatNumber(MIN_LNG, MAX_LNG, 5);
  const currentIndex = index + 1;

  return {
    author: {
      avatar: `img/avatars/user${(currentIndex.toString()).padStart(2, '0')}.png`
    },

    offer: {
      address: `${lat}, ${lng}`,
      title: getRandomElement(OFFER_TITLES),
      price: getRandomPositiveNumber(0, PRICE),
      type:  getRandomElement(OFFER_TYPES),
      rooms: getRandomPositiveNumber(1, COUNT_ROOMS),
      guests: getRandomPositiveNumber(0, COUNT_GUESTS),
      checkin: getRandomElement(TIME_VARIANTS),
      checkout: getRandomElement(TIME_VARIANTS),
      features: getRandomArray(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
      location: {
        lat: lat,
        lng: lng,
      }
    }
  };
};

const createCards = Array.from({length: COUNT_ADS}).map((i, index) => createCard(index));

export {createCards};

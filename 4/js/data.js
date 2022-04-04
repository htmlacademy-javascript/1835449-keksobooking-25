import {getRandomPositiveNumber, getRandomFloatNumber, getRandomElement, getRandomArray} from './utils.js';

const COUNT_ADS = 10;

const OFFER_TITLES = [
  'Заголовок объявления 1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10'
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
  'Описание помещеня 1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createAd = (idx) => {
  const lat = getRandomFloatNumber(MIN_LAT, MAX_LAT, 5);
  const lng = getRandomFloatNumber(MIN_LNG, MAX_LNG, 5);
  const currentIndex = idx + 1;

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

const createAds = Array.from({length: COUNT_ADS}).map((item, idx) => createAd(idx));

export {createAds, COUNT_ADS};

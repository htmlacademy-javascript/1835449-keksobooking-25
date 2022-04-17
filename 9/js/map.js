import {getData} from './api.js';
import {renderCard} from './render-card.js';
import {showAlert, debounce} from './utils.js';
import {
  adForm,
  mapFilters,
  interactiveElements,
  filtersForm
} from './elements.js';
import {resetPhotos} from './photos.js';
import {
  filterCards,
  updateCheckedFeatures
} from './filters.js';

const Coords = {
  LAT: 35.6895,
  LNG: 139.692,
};

const CREATION_DELAY = 500;

// Блокируем страницу

const activatePage = (shouldActivate) => {
  adForm.classList[shouldActivate ? 'remove' : 'add']('ad-form--disabled');
  mapFilters.classList[shouldActivate ? 'remove' : 'add']('ad-form--disabled');
  interactiveElements.forEach((child) => child[shouldActivate ? 'removeAttribute' : 'setAttribute']('disabled', 'disabled'));
};

// Инициализируем карту

let dataCache = [];

const map = L.map('map-canvas')
  .on('load', () => {
    getData(
      'https://25.javascript.pages.academy/keksobooking/data',
      (cards) => {
        dataCache = cards;
        setCards();
      },
      () => {
        showAlert('data-load-error');
        mapFilters.classList.add('ad-form--disabled');
      }
    );
  })
  .setView({
    lat: Coords.LAT,
    lng: Coords.LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Создаем главную метку

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: Coords.LAT,
    lng: Coords.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

// Создаем обычные метки

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Создаем слой с метками

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (card) => {
  const lat = card.location.lat;
  const lng = card.location.lng;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(renderCard(card));
};

// Получаем адрес текущего пина

const getCurrentAddress = (pin) => Object.values(pin.getLatLng()).map((item) => item.toFixed(5)).join(', ');
const addressField = document.querySelector('.ad-form').querySelector('#address');

// Обновляем данные

const onFilterChange = () => {
  updateCheckedFeatures();
  setCards();
};

// Очищаем данные

const resetData = () => {
  adForm.reset();
  mapFilters.reset();
  resetPhotos();
  setCards();

  mainPinMarker.setLatLng({
    lat: Coords.LAT,
    lng: Coords.LNG,
  });
  map.setView({
    lat: Coords.LAT,
    lng: Coords.LNG,
  }, 12);

  addressField.value = getCurrentAddress(mainPinMarker);
};

function setCards() {
  markerGroup.clearLayers();
  const filteredData = filterCards(dataCache);
  filteredData.forEach((card) => createMarker(card));
  activatePage(true);
}

addressField.value = getCurrentAddress(mainPinMarker);

mainPinMarker.on('moveend', (evt) => {
  const currentAddress = evt.target;
  addressField.value = getCurrentAddress(currentAddress);
});

// Обрабатываем изменения в фильтрации

filtersForm.addEventListener('change', debounce(onFilterChange, CREATION_DELAY));

export {resetData};

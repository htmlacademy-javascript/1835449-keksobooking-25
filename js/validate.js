import {
  adForm,
  priceField
} from './elements.js';

const MinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000
};

const RoomsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error'
});

const validate = (element) => pristine.validate(element);

const validatePrice = (value) => {
  const unit = adForm.querySelector('[name="type"]');
  return value.length && value >= MinPrice[unit.value.toUpperCase()];
};

const getPriceErrorMessage = () => {
  const unit = adForm.querySelector('[name="type"]');
  return `Минимальная цена, руб.: ${MinPrice[unit.value.toUpperCase()]}`;
};

const onTypeChange = (evt) => {
  priceField.placeholder = MinPrice[evt.target.value.toUpperCase()];
  validate(priceField);
};

const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');

const onRoomsChange = () => {
  validate(capacityField);
};

const validateRooms = () => RoomsOption[roomsField.value].includes(capacityField.value);

const getRoomsErrorMessage = () => `Максимальная вместимость, человек: ${roomsField.value === '100' ? 'не для гостей' : roomsField.value}`;

const validateForm = () => pristine.validate();

const resetValidation = () => pristine.reset();

adForm
  .querySelectorAll('[name="type"]')
  .forEach((item) => item.addEventListener('change', onTypeChange));

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

adForm
  .querySelectorAll('[name="rooms"]')
  .forEach((item) => item.addEventListener('change', onRoomsChange));

adForm
  .querySelectorAll('[name="capacity"]')
  .forEach((item) => item.addEventListener('change', onRoomsChange));

pristine.addValidator(roomsField, validateRooms);
pristine.addValidator(capacityField, validateRooms, getRoomsErrorMessage);

export {validateForm, validate, resetValidation};

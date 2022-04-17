// Получение случайного целого числа в заданном интервале, включая числа границ интервала
const getRandomInteger = (min = 0, max = 1000000) => {
  if ((min < 0 || max < 0 || max < min) || (!Number.isIntegerisInteger(max) && !Number.isInteger(min) && max - min < 1)) {
    return 'Введены некорректные данные';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Получение случайного числа с плавающей точкой в заданном интервале, включая числа границ интервала
const getRandomNumber = (min = 0, max = 1000000, fraction = 0) => {
  if (fraction === 0) {
    return getRandomInteger (min, max);
  }

  if ((min < 0 || max < 0 || max < min || fraction < 0) || (!Number.isInteger(max) && !Number.isInteger(min) && max - min < 1 && fraction === 0)) {
    return 'Введены некорректные данные';
  }

  let fractionCorrection = 1;
  for (let i = 0; i < fraction; i++) {
    fractionCorrection *= 10;
  }
  max *= fractionCorrection;
  min *= fractionCorrection;
  return Math.trunc(Math.random() * (max - min + 1) + min) / fractionCorrection;
};

// Получение случайного элемента, неповторяющегося элемента и массива элементов

const getRandomArrayElement = (elements) => {
  const elementIndex = getRandomInteger(0, elements.length - 1);
  return elements[elementIndex];
};

const getRandomUniqueArrayElement = (elements) => {
  const elementsLength = elements.length;
  if (elementsLength >= 1) {
    const elementIndex = getRandomInteger(0, elementsLength - 1);
    return elements.splice(elementIndex, 1).join();
  }
  return 'Данные не найдены.';
};

const getRandomArrayElements = (allElements) => {
  const allLocalElements = allElements.slice();
  const offerElements = [];
  const offerElementsLength = getRandomInteger(1, allLocalElements.length);
  for (let i = 0; i < offerElementsLength; i++) {
    const elementIndex = getRandomInteger(0, allLocalElements.length - 1);
    const offerElement = allLocalElements.splice(elementIndex, 1).join();
    offerElements.push(offerElement);
  }
  return offerElements;
};

// Проверяем нажатие клавиши Esc

const isEscapeKey = (evt) => evt.key === 'Escape';

// Выводим сообщения из шаблонов

const showAlert = (status) => {
  const alertTemplate = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const alertElement = alertTemplate.cloneNode(true);
  document.body.append(alertElement);

  const onDocumentClick = () => {
    deleteElementAndListeners();
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      deleteElementAndListeners();
    }
  };

  function deleteElementAndListeners() {
    alertElement.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomNumber,
  getRandomArrayElement,
  getRandomUniqueArrayElement,
  getRandomArrayElements,
  isEscapeKey,
  showAlert,
  debounce
};

function getRandomNumber(min, max) {
  if (max <= min || min < 0 || max <= 0) {
    window.console.log('Неверный диапазон');
  } else {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}

// Источник https://schoolsw3.com/js/js_random.php

getRandomNumber(1, 10);

function getRandomFloatNumber(min, max, maxDigits = 0) {
  if (max <= min || min < 0 || max <= 0) {
    window.console.log('Неверный диапазон');
  } else {
    const digitsDegree = 10 ** maxDigits;
    return ~~((Math.random() * (max - min + 1) + min) * digitsDegree) / digitsDegree;
  }
}

// Источник https://qna.habr.com/q/999157

getRandomFloatNumber(1,10,5);

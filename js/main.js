// Источник https://schoolsw3.com/js/js_random.php
function getRandomNumber(min, max) {
  if (max <= min || min < 0 || max <= 0) {
    new Error('Неверный диапазон');
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

getRandomNumber(1, 10);

// Источник https://qna.habr.com/q/999157
function getRandomFloatNumber(min, max, maxDigits = 0) {
  if (max <= min || min < 0 || max <= 0) {
    new Error('Неверный диапазон');
  }
  const digitsDegree = 10 ** maxDigits;
  return Math.round((Math.random() * (max - min + 1) + min) * digitsDegree) / digitsDegree;
}

getRandomFloatNumber(1,10,5);

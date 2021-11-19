// const watched = [];
// let myLib = document.querySelector('.collection');
// let markup = '';

// // Слушатель по клику на кнопку добавляет фильм в массив объектов

// setTimeout(() => {
//   let movieMarkup = document.querySelector('.collection__item').outerHTML;
//   let movieMarkup2 = document.querySelector('.collection__item').outerHTML;

//   watched.unshift(movieMarkup);
//   watched.unshift(movieMarkup2);

//   localStorage.setItem('watched', JSON.stringify(watched));
//   console.log(watched);
//   const watchedLocal = JSON.parse(localStorage.getItem('watched'));
//   watchedLocal.forEach(element => {
//     markup += element;
//   });
//   myLib.insertAdjacentHTML('beforeend', markup);
// }, 250);

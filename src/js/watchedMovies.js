const key = '6a2ef13a57616b6abb93fc4394172b01';
let watched = JSON.parse(localStorage.getItem('watched'));
if (watched === null) watched = [];
let myLib = document.querySelector('.collection');
let markup = '';
import cardTemplateWatched from '../templates/cardsTemplateWatched.hbs';
// localStorage.setItem('watched', JSON.stringify(watched));

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

// Слушатель по клику на кнопку добавляет фильм в массив объектов

export default async function addToWatched() {
  const movie = document.querySelector('.modal-card__img');
  const id = movie.dataset.id;
    const query = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
    let res;
    await fetch(query).then(data => data.json()).then(data => res = data);
    if (!JSON.stringify(watched).includes(JSON.stringify(res))) watched.unshift(res);
    console.log('res: ', res);
    console.log(watched);
    localStorage.setItem('watched', JSON.stringify(watched));
}
// console.log(JSON.stringify(arr[0]) === JSON.stringify({ a: 2, b: 3 }));


// fetch(
//   'https://api.themoviedb.org/3/movie/?api_key=6a2ef13a57616b6abb93fc4394172b01&language=en-US',
// )
//   .then(data => data.json())
//   .then(console.log);






const key = '6a2ef13a57616b6abb93fc4394172b01';
const watched = [];
let myLib = document.querySelector('.collection');
let markup = '';
import cardTemplateWatched from '../templates/cardsTemplateWatched.hbs';

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

// Слушатель по клику на кнопку добавляет фильм в массив объектов

export default async function addToWatched() {
  const movie = document.querySelector('.modal-card__img');
  const id = movie.dataset.id;
    const query = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
    let res;
    await fetch(query).then(data => data.json()).then(data => res = cardTemplateWatched(data));
    if (!watched.includes(res)) watched.unshift(res);
    console.log(res);
    console.log(watched);
}


// fetch(
//   'https://api.themoviedb.org/3/movie/?api_key=6a2ef13a57616b6abb93fc4394172b01&language=en-US',
// )
//   .then(data => data.json())
//   .then(console.log);

// import addToWatched from './watchedMovies';

    //   const a = document.querySelector('.js-addWatched');
    //   a.addEventListener('click', addToWatched);

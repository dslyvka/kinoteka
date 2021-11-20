import cardsTemplate from '../templates/cardsTemplateSearch.hbs';
import { debounce } from 'lodash';

const main = document.querySelector('.collection');
const search = document.querySelector('.form__input');
const searchBtn = document.querySelector('.button__submit');

let key;
let searchValue;
let query;

search.addEventListener('input', debounce(onSearch, 50));
search.addEventListener('keydown', onEnter);
searchBtn.addEventListener('click', onBtnSearch);

function onSearch(e) {
  key = '6a2ef13a57616b6abb93fc4394172b01';
  searchValue = e.target.value;
  query = `
https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchValue}&page=1&include_adult=false`;
}

function fetchMovie(query) {
  Promise.all([
    fetch(query)
      .then(data => data.json())
      .then(console.log),
    fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=6a2ef13a57616b6abb93fc4394172b01&language=en-US',
    )
      .then(data => data.json())
      .then(console.log),
  ]);
  //   .then(data => console.log(data));

  return Promise.all([
    fetch(query).then(data => data.json()),
    fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=6a2ef13a57616b6abb93fc4394172b01&language=en-US',
    ).then(data => data.json()),
  ]);
  // fetch(query).then(data => data.json());

  // .then(console.log);
}

function onEnter(e) {
  if (e.which === 13) {
    e.preventDefault();
    if (searchValue.trim() !== '') searchMovie(query);
  }
}

function onBtnSearch(e) {
  e.preventDefault();
  if (searchValue.trim() !== '') searchMovie(query);
}

function renderMovie(data, data1) {
  if (data.total_results === 0) return;
  main.innerHTML = '';
  main.insertAdjacentHTML('beforeend', cardsTemplate(data.results));
  const genres = data1.genres;
  const genres1 = document.querySelectorAll('.card__genre');
  genres1.forEach(el => {
    if (
      genres.forEach(genre => {
        // console.log(genre.id, genre.name, el.textContent);
        if (genre.id == parseInt(el.textContent)) el.textContent = genre.name + ',';
      })
    );
  });

  const cardGenres = document.querySelectorAll('.card__genres');
  cardGenres.forEach(el => {
    const genre = el.querySelectorAll('.card__genre');
    if (genre.length > 1)
      genre[genre.length - 1].innerHTML = genre[genre.length - 1].innerHTML.slice(0, -1);
  });
}

function searchMovie(query) {
  fetchMovie(query).then(data => renderMovie(...data));
}

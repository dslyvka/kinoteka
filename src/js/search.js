import cardsTemplate from '../templates/cardsTemplate.hbs';
import { debounce } from 'lodash';

const main = document.querySelector('.collection');
const search = document.querySelector('.form__input');
search.addEventListener('input', debounce(onSearch, 300));
search.addEventListener('keydown', onEnter);

let key;
let searchValue;
let query;

function onSearch(e) {
  key = '6a2ef13a57616b6abb93fc4394172b01';
  searchValue = e.target.value;
  query = `
https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchValue}&page=1&include_adult=false`;
}

function fetchMovie(query) {
  return fetch(query).then(data => data.json());
  // .then(console.log);
}

function onEnter(e) {
  if (e.which === 13) e.preventDefault();
  if (e.which === 13) fetchMovie(query).then(renderMovie);
}

function renderMovie(data) {
    main.innerHTML = '';
    main.insertAdjacentHTML('beforeend', cardsTemplate(data.results));
    console.log(data.results);
}
import cardsTemplate from '../templates/cardsTemplateSearch.hbs';
import { debounce } from 'lodash';
import { throttle } from 'lodash';
// import { createPagination } from '../js/pagination'; +

const main = document.querySelector('.collection');
const search = document.querySelector('.form__input');
const searchBtn = document.querySelector('.button__submit');
const onError = document.querySelector('.label');


let key;
let searchValue = '';
let query;
const handler = throttle(infinityScroll, 100);


search.addEventListener('input', debounce(onSearch, 50));
search.addEventListener('keydown', onEnter);
searchBtn.addEventListener('click', onBtnSearch);

function onSearch(e) {
  key = '6a2ef13a57616b6abb93fc4394172b01';
  searchValue = e.target.value;
  query = `
https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchValue}&page=${1}&include_adult=false`;
}

function fetchMovie(query) {

  return Promise.all([
    fetch(query).then(data => data.json()),
    fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=6a2ef13a57616b6abb93fc4394172b01&language=en-US',
    ).then(data => data.json()),
  ]);
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
  if (data.total_results === 0) {
    onError.classList.remove('visually-hidden');
    setTimeout(() => {
      onError.classList.add('visually-hidden');
    }, 2000);
    return;
  }

  if (data.page === 1) main.innerHTML = '';
  const pag = document.querySelector('.tui-pagination');
  pag.innerHTML = '';
  if (data.page <= data.total_pages) {
    main.insertAdjacentHTML('beforeend', cardsTemplate(data.results));
    const genres = data1.genres;
    const genres1 = document.querySelectorAll('.card__genre');
    genres1.forEach(el => {
      if (
        genres.forEach(genre => {
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
  const year = document.querySelectorAll('.card__year');
  year.forEach(el => {
    el.innerHTML = el.innerHTML.slice(0, -6);
  });

  window.addEventListener('scroll', handler);
  if (data.total_results === 0) {
    window.removeEventListener('scroll', handler);
  }
  if (data.page >= data.total_pages) {
    window.removeEventListener('scroll', handler);
  }
}

function searchMovie(query) {
  fetchMovie(query).then(data => renderMovie(...data));

}

let page = 2;


function infinityScroll() {
  if (searchValue.trim() !== '') {
    const scrollPos = document.documentElement.getBoundingClientRect();
    if (scrollPos.bottom < document.documentElement.clientHeight + 400) {
      query = `
            https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchValue}&page=${page}&include_adult=false`;
      searchMovie(query);
      page += 1;
    }
  }
}

export default handler;
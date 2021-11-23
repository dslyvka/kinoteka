import cardsTemplate from '../templates/cardsTemplateSearch.hbs';
import { debounce } from 'lodash';
import { throttle } from 'lodash';
// import { createPagination } from '../js/pagination'; +

const main = document.querySelector('.collection');
const search = document.querySelector('.form__input');
const searchBtn = document.querySelector('.button__submit');
const onError = document.querySelector('.label');

// const ITEMS_PER_PAGE_HOME = 20; +

let key;
let searchValue = '';
let query;
const handler = throttle(infinityScroll, 100);
// let totalItems; +

search.addEventListener('input', debounce(onSearch, 50));
search.addEventListener('keydown', onEnter);
searchBtn.addEventListener('click', onBtnSearch);

function onSearch(e) {
  key = '6a2ef13a57616b6abb93fc4394172b01';
  searchValue = e.target.value;
  query = `
https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchValue}&page=${1}&include_adult=false`;
}

async function fetchMovie(query) {
  await Promise.all([
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

  return await Promise.all([
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

  //   const container = document.getElementById('tui-pagination-container');
  //   container.innerHTML = '';
  //     // let data = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchValue}&page=${1}&include_adult=false`)
  //   createPagination();
  //   window.pagination.on('beforeMove', event => {
  //     query = `
  // https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchValue}&page=${event.page}&include_adult=false`;
  //     searchMovie(query);
  //     //   console.log(currentPage);
  //     //   window.pagination.reset(totalItems);
  //   }); +++++++++++++++++++++++++++++++++
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
  // totalItems = data.total_results; ++++
  //   console.log(totalItems);
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
//   window.addEventListener('scroll', handler);
}

// function createPaginationForSearch() { +++++++++++++++++++++
//   const options = {
//     itemsPerPage: 0,
//     visiblePages: 0,
//     page: 1,
//     totalItems: 0,
//     centerAlign: true,
//     firstItemClassName: 'tui-first-child',
//     lastItemClassName: 'tui-last-child',
//     usageStatistics: false,
//   };
//   const container = document.getElementById('tui-pagination-container');
//   window.pagination = new Pagination(container, options);
// }

// // function totalItems() {
// //     return fetch(query)
// //         .then(data => data.json());
// //   // console.log(a);
// // }
let page = 2;

// while () {
// }
// while (true) {

// }

// window.addEventListener('scroll', handler);

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

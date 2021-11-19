import cardsTemplate from './cardsTemplate.hbs';
import fetchPopMovies from './fetchPopularMovies';

const container = document.querySelector('.collection');

window.addEventListener('load', renderPopularMovies);

function renderPopularMovies() {
  fetchPopMovies().then(data => {
    container.insertAdjacentHTML('beforeend', cardsTemplate(data));
  });
}

export * from './renderPopularMovies';

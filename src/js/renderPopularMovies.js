import cardsTemplate from '../templates/cardsTemplate.hbs';
import fetchPopMovies from './fetchPopularMovies';

const container = document.querySelector('.collection');

window.addEventListener('load', renderPopularMovies);

async function renderPopularMovies() {
  let [movies, genres] = await fetchPopMovies();
  movies.forEach(movie => {
    movie['genres'] = [];
    movie['genre_ids'].forEach(genreId => {
      Array.prototype.push.apply(
        movie['genres'],
        genres.filter(genre => genre.id === genreId),
      );
    });
  });
  console.log(movies);
  container.insertAdjacentHTML('beforeend', cardsTemplate(movies));
}

export * from './renderPopularMovies';

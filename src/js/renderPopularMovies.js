import cardsTemplate from '../templates/cardsTemplate.hbs';
import fetchPopMovies from './fetchPopularMovies';

window.addEventListener('load', function () {
  renderPopularMovies();
});

const container = document.querySelector('.collection');
const loader = document.getElementById('loader');

export async function renderPopularMovies(page = 1) {
  container.innerHTML = '';
  // start loader
  loader.classList.add('is-visible');

  let [movies, genres] = await fetchPopMovies(page);
  // stop loader
  loader.classList.remove('is-visible');
  movies.forEach(movie => {
    movie['genres'] = [];
    movie['genre_ids'].forEach(genreId => {
      let resolvedGenre = genres.find(genre => genre.id === genreId);
      if (resolvedGenre) {
        movie['genres'].push(resolvedGenre.name);
      }
    });
    movie['genres'] = movie['genres'].join(', ');
    movie['year'] = new Date(movie['first_air_date'] || movie['release_date']).getFullYear() + '';
  });
  console.log(movies);
  container.insertAdjacentHTML('beforeend', cardsTemplate(movies));
}

import cardsTemplate from '../templates/cardsTemplate.hbs';
import fetchPopMovies from './fetchPopularMovies';

window.addEventListener('load', function () {
  renderPopularMovies();
});

const container = document.querySelector('.collection');

export async function renderPopularMovies(page = 1) {
  container.innerHTML = '';
  let [movies, genres] = await fetchPopMovies(page);
  movies.forEach(movie => {
    movie['genres'] = [];
    movie['genre_ids'].forEach(genreId => {
      Array.prototype.push.apply(
        movie['genres'],
        genres.filter(genre => genre.id === genreId),
      );
    });
    movie['year'] = new Date(movie['first_air_date'] || movie['release_date']).getFullYear() + '';
  });
  console.log(movies);
  container.insertAdjacentHTML('beforeend', cardsTemplate(movies));
}

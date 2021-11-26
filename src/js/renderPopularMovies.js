import cardsTemplate from '../templates/cardsTemplate.hbs';
import fetchPopMovies from './fetchPopularMovies';
import Swal from 'sweetalert2';

window.addEventListener('load', function () {
  renderPopularMovies();
});

const container = document.querySelector('.collection');
const loader = document.getElementById('loader');

export async function renderPopularMovies(page = 1) {
  fetchPopMovies(page, loader)
    .then(result => {
      container.innerHTML = '';
      let [movies, genres] = result;
      movies = movies.results;
      genres = genres.genres;
      movies.forEach(movie => {
        movie['genres'] = [];
        movie['genre_ids'].forEach(genreId => {
          let resolvedGenre = genres.find(genre => genre.id === genreId);
          if (resolvedGenre) {
            movie['genres'].push(resolvedGenre.name);
          }
        });
        movie['genres'] = movie['genres'].join(', ');
        movie['year'] =
          new Date(movie['first_air_date'] || movie['release_date']).getFullYear() + '';
      });
      console.log(movies);
      container.insertAdjacentHTML('beforeend', cardsTemplate(movies));
    })
    .catch(error => {
      Swal.fire({
        title: 'Sorry',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    });
}

// JS модального окна с полной информацией о кинофильме
import movieModalCard from '../templates/movieModalCardTemplate.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import addToWatched from './watchedMovies';
import addToQ from './addQ';
import Swal from 'sweetalert2';

const swalCustom = Swal.mixin({
  customClass: {
    confirmButton: 'modal-closeButton',
  },
  buttonsStyling: false,
});

const apiKey = '6a2ef13a57616b6abb93fc4394172b01';
const BASE_URL = 'https://api.themoviedb.org/3';

const cardMovie = document.querySelector('.collection');
const background = document.querySelector('.section');

cardMovie.addEventListener('click', openModal);

function fetchOneMovieInfo(movie_id) {
  const url = `${BASE_URL}/movie/${movie_id}?api_key=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      ...data,
      popularity: data.popularity.toFixed(1),
    }));
}

function openModal(e) {
  e.preventDefault();
  fetchOneMovieInfo(e.target.closest('article').dataset.id)
    .then(async data => {
      const markup = movieModalCard(data);
      const modal = basicLightbox.create(markup);

      await modal.show();

      const watched = document.querySelector('.js-addWatched');
      watched.addEventListener('click', addToWatched);

      const q = document.querySelector('.js-addQueue');
      q.addEventListener('click', addToQ);

      background.classList.add('nosroll');

      const closeButton = document.querySelector('.modal__button-close');

      closeButton.addEventListener('click', closeModal);
      background.addEventListener('click', closeModalUnderlay);
      window.addEventListener('keydown', closeModalHandler);

      function closeModal(e) {
        modal.close(e);
        background.classList.remove('nosroll');
        closeButton.removeEventListener('click', closeModal);
        background.removeEventListener('click', closeModalUnderlay);
        window.removeEventListener('keydown', closeModalHandler);
        watched.removeEventListener('click', addToWatched);
        q.removeEventListener('click', addToQ);
      }

      function closeModalUnderlay(e) {
        modal.close(e);
        background.classList.remove('nosroll');
        closeButton.removeEventListener('click', closeModal);
        background.removeEventListener('click', closeModalUnderlay);
        window.removeEventListener('keydown', closeModalHandler);
        watched.removeEventListener('click', addToWatched);
        q.removeEventListener('click', addToQ);
      }

      function closeModalHandler(e) {
        if (e.code === 'Escape') {
          modal.close(e);
          background.classList.remove('nosroll');
          closeButton.removeEventListener('click', closeModal);
          background.removeEventListener('click', closeModalUnderlay);
          window.removeEventListener('keydown', closeModalHandler);
          watched.removeEventListener('click', addToWatched);
          q.removeEventListener('click', addToQ);
        }
      }
    })
    .then(data => {})
    .catch(error => {
      swalCustom.fire({
        title: 'Sorry',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    });
}

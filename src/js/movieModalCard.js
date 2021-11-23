// JS модального окна с полной информацией о кинофильме

import movieModalCard from '../templates/movieModalCardTemplate.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import addToWatched from './watchedMovies';

const apiKey = '6a2ef13a57616b6abb93fc4394172b01';

const cardMovie = document.querySelector('.collection');
const background = document.querySelector('body');

cardMovie.addEventListener('click', openModal);

function fetchOneMovieInfo(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      ...data,
      popularity: data.popularity.toFixed(1),
    }));
}

function openModal(e) {
  e.preventDefault();

  fetchOneMovieInfo(e.target.dataset.id)
    .then(data => {
      if (e.target.nodeName !== 'IMG') return;

      const markup = movieModalCard(data);
      const modal = basicLightbox.create(markup);

      modal.show();

      const watched = document.querySelector('.js-addWatched');
      watched.addEventListener('click', addToWatched);
      // localStorage.clear();

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
      }

      function closeModalUnderlay(e) {
        modal.close(e);
        background.classList.remove('nosroll');
        closeButton.removeEventListener('click', closeModal);
        background.removeEventListener('click', closeModalUnderlay);
        window.removeEventListener('keydown', closeModalHandler);
      }

      function closeModalHandler(e) {
        if (e.code === 'Escape') {
          modal.close(e);
          background.classList.remove('nosroll');
          closeButton.removeEventListener('click', closeModal);
          background.removeEventListener('click', closeModalUnderlay);
          window.removeEventListener('keydown', closeModalHandler);
        }
      }
    })
    .then(data => {})
    .catch(error => {
      console.log();
    });
}

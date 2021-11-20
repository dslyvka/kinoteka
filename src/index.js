import './sass/main.scss';
import { renderPopularMovies } from './js/renderPopularMovies';
import './js/watchedMovies';
import { createPagination } from './js/pagination';
import './js/onHomeRendering';

createPagination();

// Подключение пагинации к мейну
window.pagination.on('beforeMove', event => {
  renderPopularMovies(event.page);
});

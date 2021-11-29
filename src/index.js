import './sass/main.scss';
import { renderPopularMovies } from './js/renderPopularMovies';
import './js/watchedMovies';
import { createPagination } from './js/pagination';
import './js/onHomeRendering';
import './js/movieModalCard';
import './js/search';
import './js/isHiddenForHeaderBtns';
import './js/footerModal';
import './js/loader';
import './js/toTopBtn';
import './js/onMyLibClick';
import Swal from 'sweetalert2';

createPagination();

// Подключение пагинации к мейну
window.pagination.on('beforeMove', event => {
  renderPopularMovies(event.page);
});

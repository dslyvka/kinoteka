import renderPopularMovies from "./renderPopularMovies.js";

const refs = {
    logoBtn: document.querySelector('.js-button__logo'),
    homeBtn: document.querySelector('.js-button__home'),
};

refs.logoBtn.addEventListener('click', renderPopularMovies);
refs.homeBtn.addEventListener('click', renderPopularMovies);

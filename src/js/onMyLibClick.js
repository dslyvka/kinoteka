import cardTemplateWatched from '../templates/cardsTemplateWatched.hbs';

const myLibBtn = document.querySelector('.js-button__myLibrary');
const container = document.querySelector('.collection');
const pag = document.querySelector('.tui-pagination');

const watchedBtn = document.querySelector('.js-button-watched');
const queueBtn = document.querySelector('.button__q');

myLibBtn.addEventListener('click', () => {
  const watched = JSON.parse(localStorage.getItem('watched'));

  if (watched != null) {
    clear();
    wqRender(watched);
  } else {
    clear();
  }
});

watchedBtn.addEventListener('click', () => {
  const watched = JSON.parse(localStorage.getItem('watched'));
  if (watched != null) {
    onWatchedClick();
    clear();
    wqRender(watched);
  } else {
    onWatchedClick();
    clear();
  }
});

queueBtn.addEventListener('click', () => {
  const q = JSON.parse(localStorage.getItem('q'));
  if (q != null) {
    onQueueClick();
    clear();
    wqRender(q);
  } else {
    onQueueClick();
    clear();
  }
});

function clear() {
  container.innerHTML = '';
  pag.innerHTML = '';
}

function wqRender(data) {
  data.forEach(el => {
    container.insertAdjacentHTML('beforeend', cardTemplateWatched(el));
  });
  const cardGenres = document.querySelectorAll('.card__genres');

  cardGenres.forEach(el => {
    const genre = el.querySelectorAll('.card__genre');
    if (genre.length > 1)
      genre[genre.length - 1].innerHTML = genre[genre.length - 1].innerHTML.slice(0, -1);
    if (genre.length === 1) genre[0].innerHTML = genre[0].innerHTML.slice(0, -1);
  });

  const year = document.querySelectorAll('.card__year');
  year.forEach(el => {
    el.innerHTML = el.innerHTML.slice(0, -6);
  });
}

function onWatchedClick() {
  watchedBtn.classList.add('button__current');
  queueBtn.classList.remove('button__current');
}

function onQueueClick() {
  watchedBtn.classList.remove('button__current');
  queueBtn.classList.add('button__current');
}

const myLibBtn = document.querySelector('.js-button__myLibrary');
const container = document.querySelector('.collection');
const pag = document.querySelector('.tui-pagination');
console.log(pag);
console.log(myLibBtn);

const watched = JSON.parse(localStorage.getItem('watched'));
const q = JSON.parse(localStorage.getItem('q'));
console.log(watched);
if (watched !== null) {
  myLibBtn.addEventListener('click', async () => {
    pag.innerHTML = ' ';
    container.innerHTML = '';
    await container.insertAdjacentHTML('beforeend', watched.join(''));
    const cardGenres = await document.querySelectorAll('.card__genres');
    const year = await document.querySelectorAll('.card__year');

    await console.log(year);

    cardGenres.forEach(el => {
      const genre = el.querySelectorAll('.card__genre');
      if (genre.length > 1)
        genre[genre.length - 1].innerHTML = genre[genre.length - 1].innerHTML.slice(0, -1);
    });

    year.forEach(el => {
      el.innerHTML = el.innerHTML.slice(0, -6);
    });
    const watchedButton = document.querySelector('.js-button-watched');
    watchedButton.addEventListener('click', async () => {
      const queue = document.querySelector('.button__q');
      queue.classList.remove('button__current');
      container.innerHTML = '';
      await container.insertAdjacentHTML('beforeend', watched.join(''));
      const cardGenres = await document.querySelectorAll('.card__genres');
      const year = await document.querySelectorAll('.card__year');

      await console.log(year);

      cardGenres.forEach(el => {
        const genre = el.querySelectorAll('.card__genre');
        if (genre.length > 1)
          genre[genre.length - 1].innerHTML = genre[genre.length - 1].innerHTML.slice(0, -1);
      });

      year.forEach(el => {
        el.innerHTML = el.innerHTML.slice(0, -6);
      });
    });

    //
    console.log(q);
    const queue = document.querySelector('.button__q');
    queue.addEventListener('click', async () => {
      const watchedButton = document.querySelector('.js-button-watched');
      watchedButton.classList.remove('button__current');
      container.innerHTML = '';
      if (q !== null) {
        //   myLibBtn.addEventListener('click', async () => {
        // const watchedButton = document.querySelector('.js-button-watched');
        // watchedButton.classList.remove('button__current');
        // container.innerHTML = '';
        await container.insertAdjacentHTML('beforeend', q.join(''));
        const cardGenres = await document.querySelectorAll('.card__genres');
        const year = await document.querySelectorAll('.card__year');

        await console.log(year);

        cardGenres.forEach(el => {
          const genre = el.querySelectorAll('.card__genre');
          if (genre.length > 1)
            genre[genre.length - 1].innerHTML = genre[genre.length - 1].innerHTML.slice(0, -1);
        });

        year.forEach(el => {
          el.innerHTML = el.innerHTML.slice(0, -6);
        });
        //   });
        if (q === null) {
          console.log(q);
          const watchedButton = document.querySelector('.js-button-watched');
          watchedButton.classList.remove('button__current');
          container.innerHTML = '';
        }
      }
    });
  });
  //
} else {
  myLibBtn.addEventListener('click', () => {
    pag.innerHTML = '';
    container.innerHTML = '';
    const queue = document.querySelector('.button__q');
    const watchedButton = document.querySelector('.js-button-watched');
    queue.addEventListener('click', async () => {
      const watchedButton = document.querySelector('.js-button-watched');
      watchedButton.classList.remove('button__current');
      if (q !== null) {
        //   myLibBtn.addEventListener('click', async () => {
        //   const watchedButton = document.querySelector('.js-button-watched');
        //   watchedButton.classList.remove('button__current');
        container.innerHTML = '';
        await container.insertAdjacentHTML('beforeend', q.join(''));
        const cardGenres = await document.querySelectorAll('.card__genres');
        const year = await document.querySelectorAll('.card__year');

        await console.log(year);

        cardGenres.forEach(el => {
          const genre = el.querySelectorAll('.card__genre');
          if (genre.length > 1)
            genre[genre.length - 1].innerHTML = genre[genre.length - 1].innerHTML.slice(0, -1);
        });

        year.forEach(el => {
          el.innerHTML = el.innerHTML.slice(0, -6);
        });
        //   });
      }
    });
    watchedButton.addEventListener('click', async () => {
      const queue = document.querySelector('.button__q');
      queue.classList.remove('button__current');
      container.innerHTML = '';
    });
  });
}

// localStorage.clear();
// watched.removeEventListener('click', addToWatched); 60, 52

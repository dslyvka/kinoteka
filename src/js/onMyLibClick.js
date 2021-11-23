const myLibBtn = document.querySelector('.js-button__myLibrary');
const container = document.querySelector('.collection');
console.log(myLibBtn);

const watched = JSON.parse(localStorage.getItem('watched'));
console.log(watched);
if (watched !== null) {
  myLibBtn.addEventListener('click', async () => {
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
} else {
  myLibBtn.addEventListener('click', () => {
    container.innerHTML = '';
  });
}

// localStorage.clear();

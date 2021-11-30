const key = '6a2ef13a57616b6abb93fc4394172b01';
let watched = JSON.parse(localStorage.getItem('watched'));
if (watched === null) watched = [];

// Слушатель по клику на кнопку добавляет фильм в массив объектов

export default async function addToWatched() {
  const movie = document.querySelector('.modal-card__img');
  const id = movie.dataset.id;
    const query = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
    let res;
    await fetch(query).then(data => data.json()).then(data => res = data);
    if (!JSON.stringify(watched).includes(JSON.stringify(res))) watched.unshift(res);
    localStorage.setItem('watched', JSON.stringify(watched));
}







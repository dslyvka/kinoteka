const key = '6a2ef13a57616b6abb93fc4394172b01';
let q = JSON.parse(localStorage.getItem('q'));
if (q === null) q = [];
let myLib = document.querySelector('.collection');
let markup = '';

// localStorage.setItem('watched', JSON.stringify(watched));

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

// Слушатель по клику на кнопку добавляет фильм в массив объектов

export default async function addToQ() {
  const movie = document.querySelector('.modal-card__img');
  const id = movie.dataset.id;
  const query = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
  let res;
  await fetch(query)
    .then(data => data.json())
    .then(data => (res = data));
  if (!JSON.stringify(q).includes(JSON.stringify(res))) q.unshift(res);
  console.log('res: ', res);
  console.log(q);
  localStorage.setItem('q', JSON.stringify(q));
}

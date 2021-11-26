export default async function fetchPopularMovies(page = 1, loader) {
  const BASE_URL = 'https://api.themoviedb.org/3';
  const url1 = `${BASE_URL}/trending/all/day?api_key=6a2ef13a57616b6abb93fc4394172b01&page=${page}`;
  const url2 = `${BASE_URL}/genre/movie/list?api_key=6a2ef13a57616b6abb93fc4394172b01&language=en-US`;

  const promises = [url1, url2].map(url => fetch(url).then(response => response.json()));
  loader.classList.add('is-visible');

  const result = await Promise.allSettled(promises);

  loader.classList.remove('is-visible');
  result.forEach(r => {
    if (r.value.success === false) {
      throw Error(r.value.status_message);
    }
  });
  return result.map(r => r.value);
}

export default async function fetchPopularMovies() {
  const url1 =
    'https://api.themoviedb.org/3/trending/all/day?api_key=6a2ef13a57616b6abb93fc4394172b01';
  const url2 =
    'https://api.themoviedb.org/3/genre/movie/list?api_key=6a2ef13a57616b6abb93fc4394172b01&language=en-US';

  let [res1, res2] = await Promise.all([
    fetch(url1).then(response => response.json()),
    fetch(url2).then(response => response.json()),
  ]);
  return [res1.results, res2.genres];
}

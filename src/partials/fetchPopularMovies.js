export default function fetchPopularMovies() {
  const url =
    'https://api.themoviedb.org/3/trending/all/day?api_key=6a2ef13a57616b6abb93fc4394172b01';
  return fetch(url)
    .then(response => response.json())
    .then(data => data.results);
}

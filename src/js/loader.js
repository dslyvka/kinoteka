const handleFetch = function (response) {
  const loader = document.getElementById('loader');
  loader.classList.add('is-visible');
  return response.finally(function () {
    loader.classList.remove('is-visible');
  });
};

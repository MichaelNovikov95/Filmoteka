import { alertNoEmptySearch, alertNoFilmsFound } from './alerts';
import { MovieApi } from './fetchFilms';
// import { renderCards } from './renderCards';
const DEBOUNCE_DELAY = 500;
const movieApi = new MovieApi();
const galleryEl = document.querySelector('.gallery');
const searchInputEl = document.querySelector('.js-search');

const renderPopularFilms = async () => {
  try {
    const { data } = await movieApi.fetchPopularFilms();

    galleryEl.innerHTML = renderCards(data.results);
  } catch (err) {
    console.log(err);
  }
};
renderPopularFilms();

const onSearchInput = async e => {
  e.preventDefault();
  movieApi.query = e.target.value.trim().toLowerCase();
  movieApi.page = 1;
  try {
    const { data } = await movieApi.fetchFilms();
    console.log(data.results);
    if (movieApi.query === '') {
      alertNoEmptySearch();
      return;
    } else if (data.total_results === 0) {
      alertNoFilmsFound();
      return;
    } else {
      galleryEl.innerHTML = renderCards(data.results);
    }
  } catch (err) {
    galleryEl.innerHTML = '';
    console.log(err);
  }
};

// searchInputEl.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));
searchInputEl.addEventListener('input', onSearchInput);

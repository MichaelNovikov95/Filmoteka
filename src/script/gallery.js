import { alertNoEmptySearch, alertNoFilmsFound } from './alerts';
import { MovieApi } from './fetchFilms';
import { makeMarkup } from './cardMarkup';
import { debounce } from 'debounce';
import { paginationTui, paginationStart } from './pagination';

const DEBOUNCE_DELAY = 500;
const movieApi = new MovieApi();
const galleryEl = document.querySelector('.gallery');
const searchInputEl = document.querySelector('.js-search');
const renderPopularFilms = async () => {
  try {
    const { data } = await movieApi.fetchPopularFilms();
    paginationStart(data);
    galleryEl.innerHTML = makeMarkup(data.results);
    paginationTui.on('afterMove', async function (eventData) {
      movieApi.page = eventData.page;
      const { data } = await movieApi.fetchPopularFilms();
      galleryEl.innerHTML = makeMarkup(data.results);
    });
  } catch (err) {
    console.log(err);
  }
};
renderPopularFilms();
const onSearchInput = async e => {
  e.preventDefault();
  console.log(e.target);
  movieApi.query = e.target.value.trim().toLowerCase();
  movieApi.page = 1;
  try {
    const { data } = await movieApi.fetchFilms();
    if (movieApi.query === '') {
      alertNoEmptySearch();
      return;
    } else if (data.total_results === 0) {
      alertNoFilmsFound();
      return;
    } else {
      galleryEl.innerHTML = makeMarkup(data.results);
    }
  } catch (err) {
    galleryEl.innerHTML = '';
    console.log(err.message);
  }
};
searchInputEl.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);

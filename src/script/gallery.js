import { alertNoEmptySearch, alertNoFilmsFound } from './alerts';
import { MovieApi } from './fetchFilms';
import { makeMarkup } from './cardMarkup';
import { debounce } from 'debounce';
import { paginationTui, paginationStart } from './pagination';
import refs from './refs';
import { filter } from './filter';
const DEBOUNCE_DELAY = 500;
const movieApi = new MovieApi();
const galleryEl = document.querySelector('.gallery');
const searchInputEl = document.querySelector('.js-search');

const renderPopularFilms = async () => {
  paginationTui.off('afterMove', filter);
  paginationTui.off('afterMove', search);
  paginationTui.movePageTo(1);
  try {
    const { data } = await movieApi.fetchPopularFilms();
    paginationStart(data);
    galleryEl.innerHTML = makeMarkup(data.results);
    paginationTui.on('afterMove', popular);
  } catch (err) {
    console.log(err);
  }
};
renderPopularFilms();

export async function popular(eventData) {
  movieApi.page = eventData.page;
  const { data } = await movieApi.fetchPopularFilms();
  galleryEl.innerHTML = makeMarkup(data.results);
}

const onSearchInput = async e => {
  e.preventDefault();
  paginationTui.off('afterMove', popular);
  paginationTui.off('afterMove', filter);
  paginationTui.movePageTo(1);
  console.log(e.target);
  movieApi.query = e.target.value.toLowerCase();
  movieApi.page = 1;

  try {
    const { data } = await movieApi.fetchFilms();

    // refs.container.classList.add('.effect.tui-pagination.hidden');
    if (movieApi.query === '') {
      alertNoEmptySearch();
      console.log('i am here');
      galleryEl.innerHTML = '';
      refs.container.classList.add('.tui-pagination.hidden');

      return;
    } else if (data.total_results === 0) {
      alertNoFilmsFound();
      console.log('i am here 2');
      refs.container.classList.add('.tui-pagination.hidden');
      galleryEl.innerHTML = '';
      return;
    } else {
      galleryEl.innerHTML = makeMarkup(data.results);
    }
    paginationTui.on('afterMove', search);
  } catch (err) {
    galleryEl.innerHTML = '';
    console.log(err.message);
  }
};
export async function search(eventData) {
  movieApi.page = eventData.page;
  const { data } = await movieApi.fetchFilms();
  galleryEl.innerHTML = makeMarkup(data.results);
}
searchInputEl.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);

import { alertNoEmptySearch, alertNoFilmsFound } from './alerts';
import { MovieApi } from './fetchFilms';
import { makeMarkup } from './cardMarkup';
import { debounce } from 'debounce';
import { paginationTui, paginationStart } from './pagination';
import { microphon } from './microphone';
import { filter } from './filter';
import refs from './refs';


const DEBOUNCE_DELAY = 500;
const movieApi = new MovieApi();
const galleryEl = document.querySelector('.gallery');
const searchInputEl = document.querySelector('.js-search');

const renderPopularFilms = async () => {
  paginationTui.off('afterMove', filter);
  paginationTui.off('afterMove', search);
  paginationTui.off('afterMove', microphon);
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
  paginationTui.off('afterMove', microphon);
  paginationTui.movePageTo(1);

  // console.log(e.target);
  movieApi.query = e.target.value.toLowerCase();
  movieApi.page = 1;

  try {
    if (movieApi.query === '') {
      alertNoEmptySearch();
      console.log('i am here');
      // нет смылса прятать пагинацию и перерисовывать интрефес на пустой если запрос после ретерна все равно произойдет
      // galleryEl.innerHTML = '';
      // refs.paginationWrap.classList.add('tui-pagination', 'hidden');
      return;
    }
    const { data } = await movieApi.fetchFilms(); // await наверное делает всю погоду... запрос после ретурна все равно идет.
    // порог отключения пагинации - < 2 страниц
    if (data.total_pages < 2) {
      refs.paginationWrap.classList.add('tui-pagination', 'hidden');
    } else refs.paginationWrap.classList.remove('tui-pagination', 'hidden');
    if (data.total_results === 0) {
      alertNoFilmsFound();
      refs.paginationWrap.classList.add('tui-pagination', 'hidden');
      galleryEl.innerHTML = '';
      return;
    } else {
      galleryEl.innerHTML = makeMarkup(data.results);
    }
    paginationTui.on('afterMove', search);
    // без лищних пустых страничек
    paginationTui.reset(data.total_results);
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

import { MovieApi } from './fetchFilms';
import { makeMarkup } from './cardMarkup';
import { paginationTui, paginationStart } from './pagination';
import { popular, search } from './gallery';
import { microphon } from './microphone';
const movieApi = new MovieApi();
const galleryEl = document.querySelector('.gallery');
const searchInputEl = document.querySelector('.js-search');
const filterInput = document.querySelectorAll('.filter__input');
const genreChoice = document.querySelector('#genre_choice');
const yearChoice = document.querySelector('#year_choice');
const sortChoice = document.querySelector('#sort_choice');

yearMenu();
genreMenu();
const onFilterChoice = async e => {
  e.preventDefault();
  paginationTui.off('afterMove', popular);
  paginationTui.off('afterMove', search);
  paginationTui.off('afterMove', microphon);
  paginationTui.off('afterMove', filter);
  // paginationTui.movePageTo(1);

  searchInputEl.value = '';
  // console.log(e.target.value);
  movieApi.genre = genreChoice.value;
  movieApi.year = yearChoice.value;
  movieApi.sort = sortChoice.value;
  // paginationTui.reset();

  try {
    const { data } = await movieApi.fetchMovieFilter();

    if (data.total_pages < 2) {
      refs.paginationWrap.classList.add('tui-pagination', 'hidden');
    }
    if (data.results.length === 0) {
      refs.paginationWrap.classList.add('tui-pagination', 'hidden');
      console.log('no results');
    }

    galleryEl.innerHTML = makeMarkup(data.results);
    paginationTui.on('afterMove', filter);

    // обнуляем кол-во фильмов, что дает возможность отобразить верное кол-во страниц по запросу
    paginationTui.reset(data.total_results);
  } catch (err) {
    galleryEl.innerHTML = '';
  }
};
export async function filter(eventData) {
  movieApi.page = eventData.page;
  const { data } = await movieApi.fetchMovieFilter();
  galleryEl.innerHTML = makeMarkup(data.results);

  console.log('page', eventData.page);
  console.log('data.results', data.results);
}

function renderGenreMenu(options) {
  return options.map(option => {
    return (options = `<option value="${option.id}">${option.name}</option>`);
  });
}

async function genreMenu() {
  try {
    const { data } = await movieApi.fetchMovieGenres();
    genreChoice.insertAdjacentHTML('beforeend', renderGenreMenu(data.genres));
  } catch (err) {
    console.log(err);
  }
}

function yearMenu() {
  let startYear = 1969;
  let realYear = new Date().getFullYear();
  let years = [];

  yearChoice.insertAdjacentHTML(
    'beforeend',
    '<option value="">Choose year</option>'
  );
  for (let i = realYear; i > startYear; i -= 1) {
    years.push(`<option value="${i}">${i}</option>`);
  }
  yearChoice.insertAdjacentHTML('beforeend', years);
}

filterInput.forEach(item => item.addEventListener('change', onFilterChoice));

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
  console.log('e.target.value: ', e.target.value);
  // console.log('target: ', e.target);
  console.log('name: ', e.target.name);
  // console.log('genreChoice.value:', genreChoice.value);
  movieApi[e.target.name] = e.target.value;
  // movieApi.genre = genreChoice.value;
  // movieApi.year = yearChoice.value;
  // movieApi.sort = sortChoice.value;

  try {
    let result;
    console.log(result);
    movieApi.genre
      ? (result = await movieApi.fetchMovieFilter())
      : (result = await movieApi.fetchMovieFilter2());
    console.log('result.data: ', result.data);

    if (result.data.total_pages < 2) {
      refs.paginationWrap.classList.add('tui-pagination', 'hidden');
    }
    if (result.data.results.length === 0) {
      refs.paginationWrap.classList.add('tui-pagination', 'hidden');
      console.log('no results');
    }
    paginationStart(result.data);

    galleryEl.innerHTML = makeMarkup(result.data.results);
    paginationTui.on('afterMove', filter);
    console.log('data.results: ', result.data.results);
    console.log('data: ', result.data);
    // обнуляем кол-во фильмов, что дает возможность отобразить верное кол-во страниц по запросу
    // paginationTui.reset(data.total_results);
  } catch (err) {
    galleryEl.innerHTML = '';
  }
};
export async function filter(eventData) {
  movieApi.page = eventData.page;
  let result;
  movieApi.genre
    ? (result = await movieApi.fetchMovieFilter())
    : (result = await movieApi.fetchMovieFilter2());

  galleryEl.innerHTML = makeMarkup(result.data.results);

  console.log('data.results', result.data.results);
}

function renderGenreMenu(options) {
  const arrayOfId = [];
  return options.map(option => {
    arrayOfId.push(option.id);
    // console.log(arrayOfId);
    // movieApi.genre = arrayOfId.join(',');
    // console.log(movieApi.genre);

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

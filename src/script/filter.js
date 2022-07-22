import { MovieApi } from './fetchFilms';
import { makeMarkup } from './cardMarkup';

const movieApi = new MovieApi();
const galleryEl = document.querySelector('.gallery');
const searchInputEl = document.querySelector('.js-search');
const filterInput = document.querySelectorAll('.filter__input');
const genreChoice = document.querySelector('#genre_choice');
const yearChoice = document.querySelector('#year_choice');
const sortChoice = document.querySelector('#sort_choice');
const genreTest = document.querySelector('#genre_test');
yearMenu();
// genreMenu();
const onFilterChoice = async e => {
  //   e.preventDefault();
  searchInputEl.value = '';
  console.log(e.target.value);
  movieApi.genre = genreChoice.value;
  movieApi.year = yearChoice.value;
  movieApi.sort = sortChoice.value;
  try {
    const { data } = await movieApi.fetchMovieFilter();
    console.log(data.id);
    galleryEl.innerHTML = makeMarkup(data.results);
  } catch (err) {
    galleryEl.innerHTML = '';
    console.log(err.message);
  }
};

filterInput.forEach(item => item.addEventListener('change', onFilterChoice));

// async function genreMenu() {
//   genreTest.insertAdjacentHTML(
//     'beforeend',
//     '<option value="">Choose genre</option>'
//   );
//   const { data } = await movieApi.fetchMovieGenres();
//   console.log(data);
//   const rez = data.map(genre => genre.id);
//   console.log(rez);
// }

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
yearMenu;

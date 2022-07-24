import { makeMarkup } from './cardMarkup';
import { alertNoDataGenresQuery, alertNoDataGenresLocalStrg } from './alerts';
import { MovieApi } from './fetchFilms';
import {
  saveOnLocalStorag,
  getOnLocalStorage,
  removeOnLocalStorage,
} from './localStorage';
import { refs } from './refs';
import { movieCard } from './movieCard';
import { closeModal } from './onOpenCard';
import { backdrop } from './onOpenCard';
import { modal } from './onOpenCard';
import { clearCard, onGalleryContainerClick, createMarkup } from './onOpenCard';
import { movieCard } from './movieCard';

refs.btnHeaderEl.addEventListener('click', selectBTN);
refs.galleryEl.addEventListener('click', onGalleryContainerClick);

const libraryMovieApi = new MovieApi();

const localStorageKeyQueue = 'queue';
const localStorageKeyWatched = 'watched';

const arrIdMovieQueue = getOnLocalStorage(localStorageKeyQueue) || [];
const arrIdMovieWathed = getOnLocalStorage(localStorageKeyWatched) || [];

if (arrIdMovieQueue.length !== 0) {
  startLibraryMarkup(arrIdMovieQueue);
} else console.log('no queue');

async function startLibraryMarkup(localStorageBase) {
  try {
    const objQueue = await fetchCardsLibrary(localStorageBase);
    const norm1 = objQueue.map(card => card.data);
    const norm2 = norm1.map(item => item.genres.map(genre => genre.id || []));
    const finalcards = norm1.map(
      (item, index) => (item.genre_ids = norm2[index])
    );
    refs.galleryEl.innerHTML = makeMarkup(norm1);
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchCardsLibrary(arr) {
  const arrayOfPromises = arr.map(async id => {
    libraryMovieApi.id = id;
    const response = await libraryMovieApi.fetchMovieById();
    return response;
  });
  const cardMovieLibrary = await Promise.all(arrayOfPromises);
  return cardMovieLibrary;
}

refs.btnHeaderEl.addEventListener('click', selectBTN);

function selectBTN(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (event.target.dataset.action === 'watched') {
    startLibraryMarkup(arrIdMovieWathed);
    refs.btnGelleryWatchedEl.classList.add('active');
    refs.btnGelleryQueueEl.classList.remove('active');
  } else {
    event.target.dataset.action === 'queue';
    startLibraryMarkup(arrIdMovieQueue);
    refs.btnGelleryQueueEl.classList.add('active');
    refs.btnGelleryWatchedEl.classList.remove('active');
  }
}
// elem.classList.add(cls)
// elem.classList.remove(cls)

// function addToWatched(idMovie) {
//   const newArrIdMovie = [...getOnLocalStorage(localStorageKeyWatched), idMovie];
//   saveOnLocalStorag(localStorageKeyWatched, newArrIdMovie);
// }

// function addToQueue(idMovie) {
//   const newArrIdMovie = [...getOnLocalStorage(localStorageKeyQueue), idMovie];
//   saveOnLocalStorag(localStorageKeyQueue, newArrIdMovie);
// }

// function removeOnWatched(idMovie) {
//   const newArrIdMovie = [...getOnLocalStorage(localStorageKeyWatched), idMovie];
//   removeOnLocalStorage;
// }

// function checkLocalStorageWatched(id) {
//   const checkStorage = getOnLocalStorage(`watched`) || [];
//   const idsCheckStorage = checkStorage.map(item => item.id);
//   if (!idsCheckStorage.includes(id)) {
//     refs.selectBtn.textContent = `ADD TO WATCHED`;
//     return;
//   }

//   selectBtn.textContent = `REMOVE FROM WATCHED`;
// }

// function checkLocalStorageQueue(id) {
//   const checkStorage = getOnLocalStorage(`watched`) || [];
//   const idsCheckStorage = checkStorage.map(item => item.id);
//   const selectBtn = modal_film.querySelector(`button[data-action="queue"]`);

//   if (!idsCheckStorage.includes(id)) {
//     selectBtn.textContent = `ADD TO QUEUE`;
//     return;
//   }

//   selectBtn.textContent = `REMOVE FROM QUEUE`;
// }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// function addRemoveToListBtns(e) {
//   const checkBtn = e.target.dataset.action;
//   const movie = JSON.parse(sessionStorage.getItem('currentMovie'));

//   if (checkBtn === 'watched') {
//     addRemoveFromStorage(movie, checkBtn);
//     checkQueueStorage(movie);
//     return;
//   }
//   if (checkBtn === 'queue') {
//     addRemoveFromStorage(movie, checkBtn);
//     checkWatchedStorage(movie, checkBtn);
//     return;
//   }
//   if (checkBtn === 'closeBackdrop' || modalFilmInfo) {
//     modalFilmInfo.classList.add('goodby_modal');
//     modalFilmInfo.innerHTML = '';
//     return;
//   }
// }

// function addRemoveFromStorage(movie, title) {
//   const moviesWatched = JSON.parse(localStorage.getItem(`${title}`) || '[]');
//   const selectBtn = modalFilmInfo.querySelector(
//     `button[data-action="${title}"]`
//   );
//   const moviesId = moviesWatched.map(item => item.id);

//   if (!moviesId.includes(movie.id)) {
//     moviesWatched.push(movie);
//     localStorage.setItem(`${title}`, JSON.stringify(moviesWatched));

//     selectBtn.textContent = `REMOVE FROM ${title.toUpperCase()}`;
//     return;
//   }
//   const movieIndex = moviesWatched.findIndex(item => item.id === movie.id);
//   moviesWatched.splice(movieIndex, 1);
//   localStorage.setItem(`${title}`, JSON.stringify(moviesWatched));

//   selectBtn.textContent = `ADD TO ${title.toUpperCase()}`;
// }

// function checkWatchedStorage(movie) {
//   const moviesWatched = JSON.parse(localStorage.getItem(`watched`));
//   const selectBtn = modalFilmInfo.querySelector(
//     `button[data-action="watched"]`
//   );

//   const movieIndex = moviesWatched.findIndex(item => item.id === movie.id);

//   if (movieIndex !== -1) {
//     moviesWatched.splice(movieIndex, 1);
//     localStorage.setItem(`watched`, JSON.stringify(moviesWatched));

//     selectBtn.textContent = 'ADD TO WATCHED';
//   }
// }

// function checkQueueStorage(movie) {
//   const moviesQueue = JSON.parse(localStorage.getItem(`queue`));
//   const selectBtn = modalFilmInfo.querySelector(`button[data-action="queue"]`);

//   const movieIndex = moviesQueue.findIndex(item => item.id === movie.id);

//   if (movieIndex !== -1) {
//     moviesQueue.splice(movieIndex, 1);
//     localStorage.setItem(`queue`, JSON.stringify(moviesQueue));

//     selectBtn.textContent = 'ADD TO QUEUE';
//   }
// }

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!backdrop.addEventListener(
  'click',
  onClickBackdrop
);
document.addEventListener('keydown', onClickEsc);
function onClickBackdrop(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}
function onClickEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

import {
  saveOnLocalStorag,
  getOnLocalStorage,
  removeOnLocalStorage,
} from './localStorage';
import { refs } from './refs';
import {
  localStorageKeyQueue,
  localStorageKeyWatched,
} from './localStorageKey';
import { makeMarkup } from './cardMarkup';
import { MovieApi } from './fetchFilms';
// import { startLibraryMarkup } from './watched';

// console.log(localStorageKeyQueue);
// const libraryMovieApi = new MovieApi();
refs.modalBtnParentEl.addEventListener('click', selectBTNmodal);

export function selectBTNmodal(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (event.target.dataset.action === 'watchedModal') {
    const id = Number(event.target.previousElementSibling.dataset.id);
    console.log(id);
    event.target.classList.add('film-modal__button--active');
    event.target.previousElementSibling.classList.remove(
      'film-modal__button--active'
    );
    addRemovIdWatdhedLocalStorage(id, event);
    const base = getOnLocalStorage(localStorageKeyWatched);
    startLibraryMarkup(base);
  } else {
    event.target.dataset.action === 'queueModal';
    const id = Number(event.target.dataset.id);
    console.log(id);
    event.target.classList.add('film-modal__button--active');
    event.target.nextElementSibling.classList.remove(
      'film-modal__button--active'
    );
    addRemovIdQueueLocalStorage(id, event);
    const base = getOnLocalStorage(localStorageKeyQueue);
    startLibraryMarkup(base);
  }
}

function addToWatched(idMovie) {
  const newArrIdMovie = [...getOnLocalStorage(localStorageKeyWatched), idMovie];
  saveOnLocalStorag(localStorageKeyWatched, newArrIdMovie);
}

function addToQueue(idMovie) {
  const newArrIdMovie = [...getOnLocalStorage(localStorageKeyQueue), idMovie];
  saveOnLocalStorag(localStorageKeyQueue, newArrIdMovie);
}

function removeOnQueue(idMovie) {
  const newArrIdMovie = getOnLocalStorage(localStorageKeyQueue);
  const idexDelId = newArrIdMovie.indexOf(idMovie);
  delArr = newArrIdMovie.splice(idexDelId);
  saveOnLocalStorag(localStorageKeyQueue, newArrIdMovie);
}

function removeWatched(idMovie) {
  console.log(idMovie);
  const newArrIdMovie = getOnLocalStorage(localStorageKeyWatched);
  console.log(newArrIdMovie);
  const idexDelId = newArrIdMovie.indexOf(idMovie);
  console.log(idexDelId);
  delArr = newArrIdMovie.splice(idexDelId);
  saveOnLocalStorag(localStorageKeyWatched, newArrIdMovie);
}

function checkLocalStorageWatched(id) {
  const checkStorage = getOnLocalStorage(localStorageKeyWatched) || [];
  if (!checkStorage.includes(id)) {
    return `ADD TO WATCHED`;
  }
  return `REMOVE FROM WATCHED`;
}

function checkLocalStorageQueue(id) {
  const checkStorage = getOnLocalStorage(localStorageKeyQueue) || [];
  if (!checkStorage.includes(id)) {
    return `ADD TO QUEUE`;
  }
  return `REMOVE FROM QUEUE`;
}

function addRemovIdQueueLocalStorage(id, event) {
  console.log(event.target.textContent);

  if (event.target.textContent === 'ADD TO QUEUE') {
    addToQueue(id);
    console.log('Queue addremoovLC');
    return (event.target.textContent = 'REMOVE FROM QUEUE');
  }
  if (event.target.textContent === 'REMOVE FROM QUEUE') {
    removeOnQueue(id);
    console.log('Queue addremoovLC');
    return (event.target.textContent = 'ADD TO QUEUE');
  }
}

function addRemovIdWatdhedLocalStorage(id, event) {
  if (event.target.textContent === 'ADD TO WATCHED') {
    console.log(id);
    addToWatched(id);
    return (event.target.textContent = 'REMOVE FROM WATCHED');
  }
  if (event.target.textContent === 'REMOVE FROM WATCHED') {
    console.log(id);
    removeWatched(id);
    return (event.target.textContent = 'ADD TO WATCHED');
  }
}

// async function startLibraryMarkup(localStorageBase) {
//   try {
//     const objQueue = await fetchCardsLibrary(localStorageBase);
//     const norm1 = objQueue.map(card => card.data);
//     const norm2 = norm1.map(item => item.genres.map(genre => genre.id || []));
//     const finalcards = norm1.map(
//       (item, index) => (item.genre_ids = norm2[index])
//     );
//     refs.galleryEl.innerHTML = makeMarkup(norm1);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function fetchCardsLibrary(arr) {
//   const arrayOfPromises = arr.map(async id => {
//     libraryMovieApi.id = id;
//     const response = await libraryMovieApi.fetchMovieById();
//     return response;
//   });
//   const cardMovieLibrary = await Promise.all(arrayOfPromises);
//   return cardMovieLibrary;
// }

export { checkLocalStorageWatched, checkLocalStorageQueue };
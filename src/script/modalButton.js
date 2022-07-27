import {
  saveOnLocalStorag,
  getOnLocalStorage,
  removeOnLocalStorage,
} from './localStorage';
import { refs, testEvent } from './refs';
import {
  localStorageKeyQueue,
  localStorageKeyWatched,
} from './localStorageKey';
import { makeMarkup } from './cardMarkup';
import { MovieApi } from './fetchFilms';
import { testEvent1 } from './watched';
const movieApi = new MovieApi();
refs.modalBtnParentEl.addEventListener('click', selectBTNmodal);
const crutch = window.location.pathname;

function selectBTNmodal(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (event.target.dataset.action === 'watchedModal') {
    const id = Number(event.target.previousElementSibling.dataset.id);
    event.target.classList.add('film-modal__button--active');
    event.target.previousElementSibling.classList.remove(
      'film-modal__button--active'
    );
    addRemovIdWatdhedLocalStorage(id, event);

  } else {
    event.target.dataset.action === 'queueModal';
    const id = Number(event.target.dataset.id);
    event.target.classList.add('film-modal__button--active');
    event.target.nextElementSibling.classList.remove(
      'film-modal__button--active'
    );
    addRemovIdQueueLocalStorage(id, event);
    console.log(
      crutch !== '/index.html' && event.target.dataset.action === 'queueModal'
    );

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
  let delArr = newArrIdMovie.splice(idexDelId, 1);
  saveOnLocalStorag(localStorageKeyQueue, newArrIdMovie);
}
function removeWatched(idMovie) {
  const newArrIdMovie = getOnLocalStorage(localStorageKeyWatched);
  const idexDelId = newArrIdMovie.indexOf(idMovie);
  let delArr = newArrIdMovie.splice(idexDelId, 1);
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
  if (event.target.textContent === 'ADD TO QUEUE') {
    addToQueue(id);
    return (event.target.textContent = 'REMOVE FROM QUEUE');
  }
  if (event.target.textContent === 'REMOVE FROM QUEUE') {
    removeOnQueue(id);
    return (event.target.textContent = 'ADD TO QUEUE');
  }
}
function addRemovIdWatdhedLocalStorage(id, event) {
  if (event.target.textContent === 'ADD TO WATCHED') {
    addToWatched(id);
    return (event.target.textContent = 'REMOVE FROM WATCHED');
  }
  if (event.target.textContent === 'REMOVE FROM WATCHED') {
    removeWatched(id);
    return (event.target.textContent = 'ADD TO WATCHED');
  }
}
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
    movieApi.id = id;
    const response = await movieApi.fetchMovieById();
    return response;
  });
  const cardMovieLibrary = await Promise.all(arrayOfPromises);
  return cardMovieLibrary;
}
export { checkLocalStorageWatched, checkLocalStorageQueue };

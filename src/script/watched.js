import { makeMarkup } from './cardMarkup';
import { MovieApi } from './fetchFilms';
import { getOnLocalStorage } from './localStorage';
import { refs } from './refs';
import { closeModal } from './onOpenCard';
import { backdrop } from './onOpenCard';
import { onGalleryContainerClick } from './onOpenCard';
import {
  localStorageKeyQueue,
  localStorageKeyWatched,
} from './localStorageKey';
refs.btnHeaderEl.addEventListener('click', selectBTN);
refs.galleryEl.addEventListener('click', onGalleryContainerClick);

const movieApi = new MovieApi();
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

// export { startLibraryMarkup };

async function fetchCardsLibrary(arr) {
  const arrayOfPromises = arr.map(async id => {
    movieApi.id = id;
    const response = await movieApi.fetchMovieById();
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
  movieApi.testEvent = event.target.dataset.action;
  if (event.target.dataset.action === 'watched') {
    startLibraryMarkup(getOnLocalStorage(localStorageKeyWatched));
    refs.btnGelleryWatchedEl.classList.add('active');
    refs.btnGelleryQueueEl.classList.remove('active');
  } else {
    event.target.dataset.action === 'queue';
    startLibraryMarkup(getOnLocalStorage(localStorageKeyQueue));
    refs.btnGelleryQueueEl.classList.add('active');
    refs.btnGelleryWatchedEl.classList.remove('active');
  }
}

backdrop.addEventListener('click', onClickBackdrop);

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

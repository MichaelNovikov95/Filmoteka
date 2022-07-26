import { MovieApi } from './fetchFilms';
import { movieCard } from './movieCard';
import { refs } from './refs';
// import { selectBTNmodal } from './modalButton';
import { loader } from './loader';
import {
  saveOnLocalStorag,
  getOnLocalStorage,
  removeOnLocalStorage,
} from './localStorage';
import {
  localStorageKeyQueue,
  localStorageKeyWatched,
} from './localStorageKey';

export const backdrop = document.querySelector('.backdrop');
export const modal = document.querySelector('.modal__container');
const galleryEl = document.querySelector('.gallery');
const movieApi = new MovieApi();
const closeModalFilmBtn = document.querySelector('.close__button');

if (
  !getOnLocalStorage(localStorageKeyQueue) &&
  !getOnLocalStorage(localStorageKeyWatched)
) {
  saveOnLocalStorag(localStorageKeyQueue, []);
  saveOnLocalStorag(localStorageKeyWatched, []);
}

const createMarkup = async id => {
  // loader.classList.remove('is-hidden');
  clearCard();
  movieApi.id = id;
  try {
    const { data } = await movieApi.fetchMovieById();
    console.log(data);
    modal.insertAdjacentHTML('beforeend', movieCard(data));
    // ---------------------------------------------------------------------

    closeModalFilmBtn.addEventListener('click', closeModal);

    // ---------------------------------------------------------------------
  } catch (err) {
    console.log(err);
  }
  // loader.classList.add('is-hidden');
};

const onGalleryContainerClick = e => {
  console.log(e.target.nodeName);
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  backdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-is-open');
  createMarkup(e.target.id);
};

function clearCard() {
  modal.innerHTML = '';
}
galleryEl.addEventListener('click', onGalleryContainerClick);

// ---------------------------------------------------------------------

export function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-is-open');
  modal.innerHTML = '';
  closeModalFilmBtn.removeEventListener('click', closeModal);
}
// ---------------------------------------------------------------------
export { clearCard, onGalleryContainerClick, createMarkup };

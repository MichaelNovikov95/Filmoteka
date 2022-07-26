import { MovieApi } from './fetchFilms';
import { movieCard } from './movieCard';
import { alertNoTrailer } from './alerts';
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
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export const backdrop = document.querySelector('.backdrop');
export const modal = document.querySelector('.modal__container');
const modalplace = document.querySelector('.modal');
const galleryEl = document.querySelector('.gallery');
const movieApi = new MovieApi();
const closeModalFilmBtn = document.querySelector('.close__button');
let youtubeKey = '';
if (
  !getOnLocalStorage(localStorageKeyQueue) &&
  !getOnLocalStorage(localStorageKeyWatched)
) {
  saveOnLocalStorag(localStorageKeyQueue, []);
  saveOnLocalStorag(localStorageKeyWatched, []);
}


const createMarkup = async id => {
  loader.classList.remove('is-hidden');
  clearCard();
  movieApi.id = id;
  try {
    const { data } = await movieApi.fetchMovieById();

    modal.insertAdjacentHTML('beforeend', movieCard(data));
    closeModalFilmBtn.addEventListener('click', closeModal);
    setTimeout(() => {
      const btnOpenTrailer = document.querySelector('.js-trailer');
      btnOpenTrailer.addEventListener('click', onOpenTrailerModal);
    }, 0);
  } catch (err) {
    console.log(err);
  }

  modalplace.classList.remove('is-hidden');
  loader.classList.add('is-hidden');
};

const onGalleryContainerClick = e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  
  backdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-is-open');
  createMarkup(e.target.id);
};

function createYoutubeUrl(data) {
  console.log(data);
  const { results } = data;
  console.log(results);
  results.forEach(obj => {
    if (obj.name.includes('Official Trailer')) {
      console.log('obj: ', obj);
      console.log('obj.name: ', obj.name);
      console.log('obj.key: ', obj.key);

      youtubeKey = obj.key;
    }
  });
}
const onOpenTrailerModal = async () => {
  // movieApi.id = id;
  try {
    const { data } = await movieApi.fetchMovieByIdForTrailer();
    createYoutubeUrl(data);
  } catch (err) {
    console.log(err);
  }
  if (!youtubeKey) {
    alertNoTrailer();
    return;
  }

  const openTrailer = basicLightbox.create(`
        <iframe src='https://www.youtube.com/embed/${youtubeKey}'frameborder="0" allowfullscreen class="trailer_video" width="80%" height="80%"></iframe>`);

  openTrailer.show();
};
// --------------------------------------------
function clearCard() {
  modal.innerHTML = '';
}
galleryEl.addEventListener('click', onGalleryContainerClick);

// ---------------------------------------------------------------------

export function closeModal() {
  modalplace.classList.add('is-hidden');
  backdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-is-open');
  modal.innerHTML = '';
  youtubeKey = '';
  closeModalFilmBtn.removeEventListener('click', closeModal);
}
// ---------------------------------------------------------------------
export { clearCard, onGalleryContainerClick, createMarkup };

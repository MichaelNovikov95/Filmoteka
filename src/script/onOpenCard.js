import { MovieApi } from './fetchFilms';
import { movieCard } from './movieCard';

export const backdrop = document.querySelector('.backdrop');
export const modal = document.querySelector('.modal__container');
const galleryEl = document.querySelector('.gallery');
const movieApi = new MovieApi();
const closeModalFilmBtn = document.querySelector('.close__button');

const createMarkup = async id => {
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
};
const onGalleryContainerClick = e => {
  console.log(e.target.nodeName);
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  backdrop.classList.remove('is-hidden');
  createMarkup(e.target.id);
};

function clearCard() {
  modal.innerHTML = '';
}
galleryEl.addEventListener('click', onGalleryContainerClick);

// ---------------------------------------------------------------------

export function closeModal() {
  backdrop.classList.add('is-hidden');
  modal.innerHTML = '';
  closeModalFilmBtn.removeEventListener('click', closeModal);
}
// ---------------------------------------------------------------------
export { clearCard, onGalleryContainerClick, createMarkup };

import { MovieApi } from './fetchFilms';
import { movieCard } from './movieCard';
const modal = document.querySelector('.backdrop');
const galleryEl = document.querySelector('.gallery');
const movieApi = new MovieApi();
// ---------------------------------------------------------------------
let closeModalFilmBtn = null;
// ---------------------------------------------------------------------
const createMarkup = async id => {
  clearCard();
  movieApi.id = id;
  try {
    const { data } = await movieApi.fetchMovieById();
    console.log(data);
    modal.insertAdjacentHTML('beforeend', movieCard(data));
    // ---------------------------------------------------------------------
    const closeModalFilmBtn = document.querySelector(".close__button");
    console.log(closeModalFilmBtn);
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
  modal.classList.remove('is-hidden'); 
  createMarkup(e.target.id);  
};

function clearCard() {
  modal.innerHTML = '';
}
galleryEl.addEventListener('click', onGalleryContainerClick);

// ---------------------------------------------------------------------

function closeModal() {
  modal.classList.add('is-hidden');
  modal.innerHTML = '';
  // closeModalFilmBtn.removeEventListener('click', closeModal);
}
// ---------------------------------------------------------------------
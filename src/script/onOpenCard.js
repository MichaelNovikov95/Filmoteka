import { MovieApi } from './fetchFilms';
import { movieCard } from './movieCard';
const modal = document.querySelector('.backdrop');
const galleryEl = document.querySelector('.gallery');
const movieApi = new MovieApi();

const createMarkup = async id => {
  clearCard();
  movieApi.id = id;
  try {
    const { data } = await movieApi.fetchMovieById();
    console.log(data);
    modal.insertAdjacentHTML('beforeend', movieCard(data));
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
  // modal.classList.remove('is-hidden'); добавь display:none на этот класс чтоб скрыть модалку
  createMarkup(e.target.id);
};

function clearCard() {
  modal.innerHTML = '';
}
galleryEl.addEventListener('click', onGalleryContainerClick);

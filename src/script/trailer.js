import { MovieApi } from './fetchFilms';
import { loader } from './loader';

const createMarkup = async id => {
  loader.classList.remove('is-hidden');
  clearCard();
  movieApi.id = id;
  try {
    const { data } = await movieApi.fetchMovieById();
    // const arrayOfTrailer = [];
    console.log(data);
    modal.insertAdjacentHTML('beforeend', movieCard(data));
    // ---------------------------------------------------------------------

    closeModalFilmBtn.addEventListener('click', closeModal);

    // ---------------------------------------------------------------------
  } catch (err) {
    console.log(err);
  }
  loader.classList.add('is-hidden');
};
function createYoutubeUrl(data) {
  data.forEach(obj => {
    if (obj.name.includes('Official Trailer')) {
      const youtubeKey = obj.key;
      arrayUrlTrailers.push(`https://www.youtube.com/embed/${youtubeKey}`);
      youtubeUrl = arrayUrlTrailers[0];
    }
  });
}
const onGalleryContainerClick = e => {
  console.log(e.target.nodeName);
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
};

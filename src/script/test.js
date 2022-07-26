// async function onImgClick(e) {
//   if (e.target.nodeName !== 'IMG') {
//     return;
//   }
//   id = e.target.dataset.id;
//   await getTrailerModal(id);
// }
const getTrailerModal = async filmID => {
  try {
    const trailerData = await filmsApiService.fetchTrailerById(filmID);
    arrayUrlTrailers = [];
    createYoutubeUrl(trailerData);
    setTimeout(() => {
      refs.watchTrailer = document.querySelector('.player');
      refs.watchTrailer.addEventListener('click', onOpenTrailerModal);
    }, 500);
  } catch (error) {
    console.log(error.message);
  }
};
function createYoutubeUrl(data) {
  data.results.forEach(obj => {
    if (obj.name.includes('Official Trailer')) {
      const youtubeKey = obj.key;
      arrayUrlTrailers.push(`https://www.youtube.com/embed/${youtubeKey}`);
      youtubeUrl = arrayUrlTrailers[0];
    }
  });
}

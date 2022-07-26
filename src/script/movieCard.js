import {
  checkLocalStorageWatched,
  checkLocalStorageQueue,
} from './modalButton';

import {
  localStorageKeyQueue,
  localStorageKeyWatched,
} from './localStorageKey';

export const movieCard = ({
  id,
  title,
  poster_path,
  popularity,
  original_title,
  vote_average,
  vote_count,
  genres,
  overview,
}) => {
  poster_path
    ? (poster_path = `https://image.tmdb.org/t/p/w500/${poster_path}`)
    : (poster_path = `https://upload.wikimedia.org/wikipedia/commons/4/47/GarvaGriha_in_KaryaBinayak.jpg`);
  genres = genres.map(genre => genre.name).join(', ');
  popularity = parseFloat(popularity).toFixed(1);
  const titleUpperCase = title.toUpperCase();
  const originalTitleUpperCase = original_title.toUpperCase();
  const voteAverageFixed = vote_average.toFixed(1);
  return `
      <div class="image__place" id=${id}>
      <button type="button" class="button__trailer js-trailer">
      </button>
        <img class="modal-poster" src="${poster_path}" alt="${original_title}" />
      </div>
      <div class="content__place">
          <h2 class="modal__header">${titleUpperCase}</h2>
          <div class="details">
              <ul class="details-head">
                  <li class="details-string">Vote / Votes</li>
                  <li class="details-string">Popularity</li>
                  <li class="details-string">Original Title</li>
                  <li class="details-string">Genre</li>
              </ul>
              <ul class="details-content">
                  <li class="details-string"><span class="vote--modal">${voteAverageFixed}</span> / ${vote_count}</li>
                  <li class="details-string">${popularity}</li>
                  <li class="details-string">${originalTitleUpperCase}</li>
                  <li class="details-string">${genres}</li>
              </ul>
          </div>
          <h3>ABOUT</h3>
          <p class="modal-annotation">
              ${overview}
          </p>
          <ul class="button__place">
          <button type="button" class="film-modal__button film-modal__button--active " data-id="${id}" data-action="queueModal">${checkLocalStorageQueue(
    id
  )}</button>
           <button type="button" class="film-modal__button " data-action="watchedModal">${checkLocalStorageWatched(
             id
           )}</button>
          </ul>`;
};

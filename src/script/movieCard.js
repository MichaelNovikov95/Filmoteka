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
    : (poster_path = '../images/header/search.svg');
  // на 13 строке нужно поставить картинку заглушку
  genres = genres.map(genre => genre.name).join(', ');
  popularity = parseFloat(popularity).toFixed(1);
  const titleUpperCase = title.toUpperCase();
  return `

  <div class="modal">
    <button class="close__button" data-modal-close>
        <svg class="close__icon" width="14" height="14">
            <use class="close" href="./images/sprite/symbol-defs.svg#icon-vectorclose" width="14px" height="14px"></use>
        </svg>
    </button>
    <div class="modal__container">

      <div class="image__place" id=${id}>
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
                  <li class="details-string"><span class="vote--modal">${vote_average}</span> / ${vote_count}</li>
                  <li class="details-string">${popularity}</li>
                  <li class="details-string">${original_title}</li>
                  <li class="details-string">${genres}</li>
              </ul>
          </div>
          <h3>ABOUT</h3>
          <p class="modal-annotation">
              ${overview}
          </p>
          <ul class="button__place">
              <button type="button" class="film-modal__button film-modal__button--active">ADD TO WATCHED</button>
              <button type="button" class="film-modal__button">ADD TO QUEUE</button>
          </ul>

  </div>`;
};

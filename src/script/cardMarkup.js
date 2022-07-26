import { finalGanresString } from './genresList';

export function makeMarkup(cards) {
  return cards
    .map(
      ({
        title,
        original_title,
        name,
        original_name,
        poster_path,
        release_date,
        genre_ids,
        vote_average,
        id,
      }) => {
        const date = new Date(release_date);
        const choseTitle = title || original_title || name || original_name;
        const finalTitle = function () {
          if (choseTitle.length <= 31) {
            return choseTitle.toUpperCase();
          } else {
            return choseTitle.toUpperCase().slice(0, 28) + '...';
          }
        };
        // const finalRating = Math.round10(vote_average, -2);
        const finalRating = vote_average.toString().padEnd(3, '.0').slice(0, 3);
        poster_path
          ? (poster_path = `https://image.tmdb.org/t/p/w500/${poster_path}`)
          : (poster_path =
              'https://upload.wikimedia.org/wikipedia/commons/4/47/GarvaGriha_in_KaryaBinayak.jpg');
        return (cards = `
            <li class="movie-card gallery_item" data-id="${id}">
              <img src="${poster_path}" alt="${choseTitle}" loading="lazy" class="movie-card__img" id="${id}"/>

              <div class="movie-card__info">
                <div class="movie-card__info-name-wraper"
                  <p class="movie-card__info-name">${finalTitle()}
                  </p>
                </div>
                <div class="movi-card__info-wraper">
                  <div class="movi-card">
                    <p class="movie-card__info-item">${finalGanresString(
                      genre_ids
                    )} | ${date.getFullYear() || ''}
                    </p>
                  </div>
                  <div class="card__rating">
                    <p class="card__text card__rating--text">${finalRating}</p>
                  </div>
                </div>
              </div>
            </li>
          `);
      }
    )
    .join('');
}

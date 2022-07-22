import { alertNoFilmsFound } from './alerts';
import { MovieApi } from './fetchFilms';
import {
  saveOnLocalStorag,
  getOnLocalStorage,
  removeOnLocalStorage,
} from './localStorage';

const genresMovieApi = new MovieApi();

const genresListObj = async () => {
  try {
    const { data } = await genresMovieApi.fetchMovieGenres();
    console.log('data.genres=', data.genres);
    saveOnLocalStorag(LOCALSTORAGE_KEY, data.genres);
    console.log(genresArr.push(...data.genres));
    return genresArr.push(...data.genres);
  } catch (err) {
    console.log(err);
  }
};

const LOCALSTORAGE_KEY = 'genres-kod';

const genresArr = getOnLocalStorage(LOCALSTORAGE_KEY) || [];

if (genresArr.length === 0) {
  genresListObj();
}

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
        const positiveGenres = genresArr.filter(({ id }) => {
          return genre_ids.includes(id);
        });
        const finalGanresString = positiveGenres.reduce(
          (positiveGenres, item) => {
            return positiveGenres + ' ' + item.name;
          },
          ''
        );
        // const finalRating = Math.round10(vote_average, -2)
        const finalRating = vote_average.toString().padEnd(3, '.0');
        // console.log(finalRating);
        return (cards = `
            <li class="movie-card gallery_item" data-id="${id}">
              <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${
          title || original_title || name || original_name
        }" loading="lazy" class="movie-card__img" id="${id}"/>
              <div class="movie-card__info">
                <div class="movi-card">
                  <p class="movie-card__info-name">${
                    title || original_title || name || original_name
                  }
                  </p>
                  <p class="movie-card__info-item">${finalGanresString}  | ${
          date.getFullYear() || ''
        }
                  </p>
                </div>
                <div class="card__rating">
                  <p class="card__text card__rating--text">${finalRating}</p>
                </div>
              </div>
            </li>
          `);
        // add ${finalGanresString}
      }
    )
    .join('');
}

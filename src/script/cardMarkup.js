// import { MovieApi } from './fetchFilms';
// const ClassInstance = new MovieApi();

// const gallery = document.querySelector('.gallery');
// console.log(gallery);

// async function MovieApi_TRANDING_MOVIES() {
//   const trandingMoviesApi = await ClassInstance.fetchFilms();
//   console.log('trandingMoviesApi: ', trandingMoviesApi);
//   const trandingMoviesApi_results = trandingMoviesApi.results;
//   console.log('trandingMoviesApi_results: ', trandingMoviesApi_results);

// }
// MovieApi_TRANDING_MOVIES();

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
        // const positiveGenres = genresArr.filter(itemArr => {
        //   return genre_ids.includes(itemArr.id);
        // });
        // const finalGanresString = positiveGenres.reduce(
        //   (positiveGenres, item) => {
        //     return positiveGenres + ' ' + item.name;
        //   },
        //   ''
        // );
        // const finalRating = Math.round10(vote_average, -2)
        const finalRating = vote_average.toString().padEnd(3, '.0');
        // console.log(finalRating);
        return (cards = `
            <li class="movie-card gallery_item" data-id="${id}">
              <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${
          title || original_title || name || original_name
        }" loading="lazy" class="movie-card__img"/>
              <div class="movie-card__info">
                <div class="movi-card">
                  <p class="movie-card__info-name">${
                    title || original_title || name || original_name
                  }
                  </p>
                  <p class="movie-card__info-item">"genres"  | ${
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

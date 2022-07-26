import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function alertNoEmptySearch() {
  Notify.failure('The search cannot be empty. Please make correct query.');
}

export function alertNoFilmsFound() {
  Notify.failure(
    'Sorry, search result not successful. Enter the correct movie name and try again.'
  );
}

export function alertNoDataGenresQuery() {
  Notify.failure('Sorry, search result not successful.Try again later))).');
}

export function alertNoDataGenresLocalStrg() {
  Notify.failure(
    'Sorry, search result not successful. Local Storage has problem'
  );
}

export function alertNoTrailer() {
  Notify.failure('Sorry, we can not find trailer for this movie');
}

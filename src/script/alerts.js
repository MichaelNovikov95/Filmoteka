import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function alertNoEmptySearch() {
  Notify.failure('The search cannot be empty. Please make correct query.');
}

export function alertNoFilmsFound() {
  Notify.failure(
    'Sorry, search result not successful. Enter the correct movie name and try again.'
  );
}

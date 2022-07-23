import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { refs } from './refs';

import { makeMarkup } from './cardMarkup';
const movieApi = new MovieApi();
const galleryEl = document.querySelector('.gallery');
const renderPopularFilms = async () => {
  try {
    const { data } = await movieApi.fetchPopularFilms();
    galleryEl.innerHTML = makeMarkup(data.results);
    const options = {
      totalItems: data.total_results,
      itemsPerPage: 20,
      visiblePages: 5,
      page: 1,
      centerAlign: true,
    };

    const pagination = new Pagination(refs.container, options);
  } catch (err) {
    console.log(err);
  }
};
renderPopularFilms();

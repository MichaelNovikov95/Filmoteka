import axios from 'axios';

export class MovieApi {
  #BASE_URL = 'https://api.themoviedb.org/3';
  #API_KEY = '34dbf9d1a3fd74b10bf7ab9eec59866f';
  #POPULAR_URL = `${this.#BASE_URL}/trending/movie/week`;
  #SEARCH_URL = `${this.#BASE_URL}/search/movie`;
  #ID_URL = `${this.#BASE_URL}/movie/`;
  #GENRES_URL = `${this.#BASE_URL}/genre/movie/list`;
  #FILTER_URL = `${this.#BASE_URL}/discover/movie`;

  constructor() {
    this.query = null;
    this.id = null;
    this.page = 1;
    this.genre = '';
    this.year = null;
    this.sort = 'popularity.desc';
    this.testEvent = 'queue';
  }
  // by input
  fetchFilms() {
    return axios.get(`${this.#SEARCH_URL}`, {
      params: {
        api_key: this.#API_KEY,
        query: this.query,
        page: this.page,
        language: 'en-US',
      },
    });
  }

  fetchPopularFilms() {
    return axios.get(`${this.#POPULAR_URL}`, {
      params: {
        api_key: this.#API_KEY,
        page: this.page,
        language: 'en-US',
      },
    });
  }
  fetchMovieById() {
    return axios.get(`${this.#ID_URL}${this.id}`, {
      params: {
        api_key: this.#API_KEY,
        page: this.page,
        language: 'en-US',
      },
    });
  }
  fetchMovieGenres() {
    return axios.get(`${this.#GENRES_URL}`, {
      params: {
        api_key: this.#API_KEY,
        language: 'en-US',
      },
    });
  }
  fetchMovieFilterWithGenres() {
    return axios.get(`${this.#FILTER_URL}`, {
      params: {
        api_key: this.#API_KEY,
        language: 'en-US',
        primary_release_year: this.year,
        with_genres: this.genre,
        sort_by: this.sort,
        page: this.page,
      },
    });
  }
  fetchMovieFilterWithoutGenres() {
    return axios.get(`${this.#FILTER_URL}`, {
      params: {
        api_key: this.#API_KEY,
        language: 'en-US',
        primary_release_year: this.year,
        sort_by: this.sort,
        page: this.page,
      },
    });
  }
  fetchMovieByIdForTrailer() {
    return axios.get(`${this.#ID_URL}${this.id}/videos`, {
      params: {
        api_key: this.#API_KEY,
        page: this.page,
        language: 'en-US',
      },
    });
  }
}

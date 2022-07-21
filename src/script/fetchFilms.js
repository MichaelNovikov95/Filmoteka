import axios from 'axios';

export class MovieApi {
  #BASE_URL = 'https://api.themoviedb.org/3';
  #API_KEY = '34dbf9d1a3fd74b10bf7ab9eec59866f';
  #POPULAR_URL = `${this.#BASE_URL}/trending/movie/week`;
  #SEARCH_URL = `${this.#BASE_URL}/search/movie`;
  #ID_URL = `${this.#BASE_URL}/movie/`;

  constructor() {
    this.query = null;
    this.id = null;
    this.page = 1;
  }

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
    return axios.get(`${this.#ID_URL}`, {
      params: {
        api_key: this.#API_KEY,
        id: this.id,
        page: this.page,
        language: 'en-US',
      },
    });
  }
}

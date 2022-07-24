import { MovieApi } from './fetchFilms';
import { makeMarkup } from './cardMarkup';
import { paginationTui, paginationStart } from './pagination';
import { popular, search } from './gallery';
import { filter } from './filter';
import refs from './refs';
const galleryEl = document.querySelector('.gallery');
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const movieApi = new MovieApi();
const microphoneIcon = document.querySelector('.header-search__btn-mic');
const recordIcon = document.querySelector('.header-search__icon-record');
const searchInputEl = document.querySelector('.js-search');
const recognition = new SpeechRecognition();

recognition.lang = 'en-EN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

microphoneIcon.addEventListener('click', function () {
  searchInputEl.value = '';
  startRecognition();
  console.log('Ready to receive a movieName command.');
});

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onnomatch = function (e) {
  alert("I didn't recognise that movie.");
};

recognition.onerror = function (e) {
  alert(`Error occurred in recognition: ${e.error}`);
};

function listenSpeech(e) {
  const transcript = e.results[0][0].transcript;
  searchInputEl.value = transcript;
  if (e.results[0].isFinal) {
    stopRecognition();
    onSearchInputForMicrophone(transcript);
  }
}

function startRecognition() {
  recognition.addEventListener('result', listenSpeech);
  recordIcon.classList.remove('is-hidden');
  recognition.start();
}
function stopRecognition() {
  recognition.removeEventListener('result', listenSpeech);
  recordIcon.classList.add('is-hidden');
  recognition.stop();
}

const onSearchInputForMicrophone = async movieName => {
  paginationTui.off('afterMove', popular);
  paginationTui.off('afterMove', search);
  paginationTui.off('afterMove', filter);
  paginationTui.movePageTo(1);

  movieApi.page = 1;
  movieApi.query = movieName;
  try {
    const { data } = await movieApi.fetchFilms();

    if (data.total_pages < 2) {
      refs.paginationWrap.classList.add('tui-pagination', 'hidden');
    } else refs.paginationWrap.classList.remove('tui-pagination', 'hidden');
    if (movieApi.query === '') {
      alertNoEmptySearch();
      return;
    } else if (data.total_results === 0) {
      alertNoFilmsFound();
      return;
    } else {
      galleryEl.innerHTML = makeMarkup(data.results);
    }
    paginationTui.on('afterMove', microphon);
    paginationTui.reset(data.total_results);
  } catch (err) {
    galleryEl.innerHTML = '';
    console.log(err.message);
  }
};
export async function microphon(eventData) {
  movieApi.page = eventData.page;
  const { data } = await movieApi.fetchFilms();
  galleryEl.innerHTML = makeMarkup(data.results);
}

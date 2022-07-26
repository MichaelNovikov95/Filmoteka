import Notiflix from 'notiflix';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBz5_WEoInvREC_39QfDZZZECl5U8Gjy9s',
  authDomain: 'auth-film.firebaseapp.com',
  projectId: 'auth-film',
  storageBucket: 'auth-film.appspot.com',
  messagingSenderId: '298945320872',
  appId: '1:298945320872:web:2c146219caa9b256beef9d',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const logOutBtn = document.querySelector('[data-logout]');

function onClickLogoutHandler(e) {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      location.replace('https://michaelnovikov95.github.io/Filmoteka/');
      Notiflix.Notify.warning('You are now successfully logged out!');
    })
    .catch(error => {
      const errorCode = error.code;
      Notiflix.Notify.failure(errorCode);
    });
}

logOutBtn.addEventListener('click', onClickLogoutHandler);

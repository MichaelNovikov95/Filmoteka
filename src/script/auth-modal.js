import Notiflix from 'notiflix';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { closeSignupModal } from './signup-modal';
import { closeSignInModal } from './signin-modal';

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
const loginForm = document.querySelector('[data-signin-form]');
const signupForm = document.querySelector('[data-signup-form]');
const logOutBtn = document.querySelector('[data-logout]');
const libraryLink = document.querySelector(
  '.nav-menu__link.library-link.is-unactive'
);

onAuthStateChanged(auth, user => {
  let userInterface = user;
  if (user) {
    const uid = user.uid;
  }
  enableUserInterface(user);
});

function onSubmitSigninHandler(e) {
  e.preventDefault();
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      e.target.reset();
      const user = userCredential.user;
      Notiflix.Notify.success('Now you have access to your library. Enjoy!');
    })
    .catch(error => {
      const errorCode = error.code;
      Notiflix.Notify.failure(errorCode);
    })
    .finally(() => {
      closeSignInModal();
    });
}

function onSubmitSignupHandler(e) {
  e.preventDefault();
  console.log('hihihihi');
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      e.target.reset();
      const user = userCredential.user;
      Notiflix.Notify.success('Now you have access to your library. Enjoy!');
    })
    .catch(error => {
      const errorCode = error.code;
      Notiflix.Notify.failure(errorCode);
    })
    .finally(() => {
      closeSignupModal();
    });
}

function onClickLogoutHandler(e) {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      Notiflix.Notify.warning('You are now successfully logged out!');
    })
    .catch(error => {
      const errorCode = error.code;
      Notiflix.Notify.failure(errorCode);
    });
}

loginForm.addEventListener('submit', onSubmitSigninHandler);
signupForm.addEventListener('submit', onSubmitSignupHandler);
logOutBtn.addEventListener('click', onClickLogoutHandler);

const logout = document.querySelector('.logout-wrap');
const login = document.querySelector('.login-wrap');

function enableUserInterface(user) {
  if (user) {
    login.classList.add('is-hidden');
    logout.classList.remove('is-hidden');
    libraryLink.classList.remove('is-unactive');
  } else {
    login.classList.remove('is-hidden');
    logout.classList.add('is-hidden');
    libraryLink.classList.add('is-unactive');
  }
}

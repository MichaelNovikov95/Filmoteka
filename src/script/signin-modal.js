const refs = {
  openModalBtn: document.querySelector('[data-signin-open]'),
  modal: document.querySelector('[data-signin-modal]'),
  crossBtn: document.querySelector('.close-auth-btn'),
};

refs.openModalBtn.addEventListener('click', openModal);
refs.crossBtn.addEventListener('click', closeSignInModal);

function closeSignupModalOnAreaClick(e) {
  console.dir(e.target.nodeName);
  if (
    e.target.classList.contains('auth-backdrop') ||
    e.target.nodeName === 'BUTTON' ||
    e.target.nodeName === 'use'
  ) {
    closeSignInModal();
  }
}

function closeModalOnEsc(e) {
  e.key === 'Escape' ? closeSignInModal() : null;
}

export function closeSignInModal() {
  document.body.classList.remove('modal-open');
  refs.modal.classList.add('visual-hidden');
  document.removeEventListener('keydown', closeModalOnEsc);
  refs.modal.removeEventListener('click', closeSignupModalOnAreaClick);
}

function openModal() {
  document.body.classList.add('modal-open');
  refs.modal.classList.remove('visual-hidden');
  document.addEventListener('keydown', closeModalOnEsc);
  refs.modal.addEventListener('click', closeSignupModalOnAreaClick);
}

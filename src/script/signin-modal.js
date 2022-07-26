const refs = {
  openModalBtn: document.querySelector('[data-signin-open]'),
  closeModalBtn: document.querySelector('[data-signup-close]'),
  modal: document.querySelector('[data-signin-modal]'),
};

refs.openModalBtn.addEventListener('click', openModal);
// refs.closeModalBtn.addEventListener('click', closeSignupModal);

function closeSignupModalOnAreaClick(e) {
  if (e.target.classList.contains('backdrop')) {
    closeSignupModal();
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

const refs = {
  openModalBtn: document.querySelector('[data-signup-open]'),
  crossBtn: document.querySelector('.close-auth-btn'),
  modal: document.querySelector('[data-signup-modal]'),
};

refs.openModalBtn.addEventListener('click', openModal);
refs.crossBtn.addEventListener('click', closeSignupModal);

function closeSignupModalOnAreaClick(e) {
  if (e.target.classList.contains('auth-backdrop')) {
    closeSignupModal();
  }
}

function closeModalOnEsc(e) {
  e.key === 'Escape' ? closeSignupModal() : null;
}

export function closeSignupModal() {
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
import './modalButton';

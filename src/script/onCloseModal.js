import { closeModal } from './onOpenCard';
import { backdrop } from './onOpenCard';

backdrop.addEventListener('click', onClickBackdrop);
document.addEventListener('keydown', onClickEsc);
function onClickBackdrop(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}
function onClickEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

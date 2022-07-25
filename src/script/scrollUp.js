const btnGoTop = document.querySelector('.btn-move-up');
function btnGoTopStatus() {
  const cardSizeAndCoordinates = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  const { height: cardHeight } = cardSizeAndCoordinates;
  if (window.pageYOffset > cardHeight) {
    btnGoTop.classList.remove('is-hidden');
  } else {
    btnGoTop.classList.add('is-hidden');
  }
}
function goTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
window.addEventListener('scroll', btnGoTopStatus);
btnGoTop.addEventListener('click', goTop);

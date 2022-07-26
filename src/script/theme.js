import refs from './refs';

function theme() {
  refs.toggleTheme.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });
}

theme();

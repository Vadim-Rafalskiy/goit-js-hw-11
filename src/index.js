import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { failMessage, totalHitsMessage } from './messages';
import { fetchImages } from './fetchImages';
import { getImageTemplate } from './getImageTemplate';

const refs = {
  form: document.querySelector('.search-form'),
  searchInput: document.querySelector('input'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
};

let images = [];

refs.form.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', handleClick);

function onSearch(e) {
  e.preventDefault();
  refs.button.setAttribute('disabled', true);
  const searchQuery = e.target.searchQuery.value.trim();

  if (searchQuery !== '')
    fetchImages(searchQuery).then(date => {
      images = date.hits;
      date.total === 0 ? failMessage() : totalHitsMessage(date.total);

      refs.gallery.innerHTML = '';
      render();
      refs.button.removeAttribute('disabled');
    });
}

const render = () => {
  const cards = images.map(getImageTemplate);
  refs.gallery.insertAdjacentHTML('beforeend', cards.join(''));
  galleryLightbox.refresh();
  refs.searchInput.value = '';
};

let galleryLightbox = new SimpleLightbox('.gallery a');

function handleClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  e.preventDefault();
  galleryLightbox.on('shown.simpleLightbox');
}

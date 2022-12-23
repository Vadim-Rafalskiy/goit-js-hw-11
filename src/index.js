import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import SimpleLightbox from 'simplelightbox';
import { failMessage, totalHitsMessage, infoMessage } from './messages';
import { fetchImages } from './fetchImages';
import { getImageTemplate } from './getImageTemplate';

const _ = require('lodash');

const refs = {
  form: document.querySelector('.search-form'),
  searchInput: document.querySelector('input'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
};

let galleryLightbox = new SimpleLightbox('.gallery a');

let images = [];
let totalHits = 1;
let nextPage = 1;
let searchQuery = '';
// let isNewQuery = true;

refs.form.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', handleClick);
window.addEventListener('scroll', _.throttle(checkPosition, 500));

function onSearch(e) {
  window.scrollTo(top);
  e.preventDefault();

  refs.button.setAttribute('disabled', true);

  searchQuery = e.target.searchQuery.value.trim();

  if (searchQuery)
    fetchImages(searchQuery, (nextPage = 1)).then(data => {
      images = data.hits;
      totalHits = data.totalHits;
      data.totalHits === 0 ? failMessage() : totalHitsMessage(data.totalHits);

      refs.gallery.innerHTML = '';
      render();
      refs.button.removeAttribute('disabled');
    });
}

function render() {
  if (images !== []) {
    refs.searchInput.value = '';
    const cards = images.map(getImageTemplate);
    refs.gallery.insertAdjacentHTML('beforeend', cards.join(''));
    galleryLightbox.refresh();
  }
}

function handleClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;

  galleryLightbox.on('shown.simpleLightbox');
}

function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;
  const threshold = height - screenHeight;

  const position = scrolled + screenHeight;
  if (position >= height) {
    infoMessage();
  }
  if (position >= threshold) {
    //nextPage < totalHits && && isNewQuery
    // isNewQuery = false;
    nextPage += 1;
    fetchImages(searchQuery, nextPage).then(data => {
      images = data.hits;
      render();
      // isNewQuery = true;
    });
  }
}

import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import SimpleLightbox from 'simplelightbox';
import * as message from './messages';
import { fetchImages } from './fetchImages';
import { getImageTemplate } from './getImageTemplate';

const _ = require('lodash');
let galleryLightbox = new SimpleLightbox('.gallery a');

const refs = {
  form: document.querySelector('.search-form'),
  searchInput: document.querySelector('input'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
};

let images = [];
let totalHits = 1;
let nextPage = 1;
let searchQuery = '';
let colectionLength = 0;

refs.form.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', handleClick);
window.addEventListener('scroll', _.throttle(repeatRequest, 500));

async function onSearch(e) {
  window.scrollTo(top);
  e.preventDefault();
  colectionLength = 0;

  searchQuery = e.target.searchQuery.value.trim();
  try {
    if (searchQuery) {
      const data = await fetchImages(searchQuery, (nextPage = 1));

      images = await data.hits;
      colectionLength = await data.hits.length;
      totalHits = await data.totalHits;
      totalHits === 0 ? message.fail() : message.totalHits(totalHits);
    }
  } catch (err) {
    console.log(err.message);
    message.badRequest();
  }

  refs.gallery.innerHTML = '';
  render();
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

async function repeatRequest() {
  const isPosition = checkPosition();
  const isEndColection = colectionLength !== totalHits;
  try {
    if (isPosition && isEndColection) {
      nextPage += 1;
      const data = await fetchImages(searchQuery, nextPage);
      colectionLength += await data.hits.length;
      images = await data.hits;
      render();
    }
  } catch (err) {
    console.log(err.message);
    message.badRequest();
  }
  if (Math.round(scrollY + innerHeight) === document.body.scrollHeight) {
    message.endColection();
  }
}

function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;

  const threshold = height - screenHeight;
  const position = scrolled + screenHeight;
  return position >= threshold;
}

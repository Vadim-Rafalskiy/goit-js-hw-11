export const getImageTemplate = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `<div class="photo-card">
  <a class='gallery__link' href="${largeImageURL}"><img class='gallery__image' loading="lazy" src="${webformatURL}" alt="${tags}" title="" /></a>
    <div class="info">
    <p class="info-item">
      <b><span class='info-item-tittle'>likes</span> ${likes}</b>
    </p>
    <p class="info-item">
      <b><span class='info-item-tittle'>views</span> ${views}</b>
    </p>
    <p class="info-item">
      <b><span class='info-item-tittle'>comments</span> ${comments}</b>
    </p>
    <p class="info-item">
    <b><span class='info-item-tittle'>downloads</span> ${downloads}</b>
    </p>
  </div>
</div>`;
};

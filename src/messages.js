import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const failMessage = () =>
  Notify.failure(
    `Sorry, there are no images matching your search query. Please try again.`,
    {
      timeout: 2000,
    }
  );

export const infoMessage = () =>
  Notify.info(`We're sorry, but you've reached the end of search results.`, {
    timeout: 2000,
  });

export const totalHitsMessage = totalHits =>
  Notify.info(`Hooray! We found ${totalHits} images.`, {
    timeout: 2000,
  });

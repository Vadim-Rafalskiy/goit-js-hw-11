import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const fail = () =>
  Notify.failure(
    `Sorry, there are no images matching your search query. Please try again.`,
    {
      timeout: 2000,
    }
  );

export const badRequest = () =>
  Notify.failure(`Sorry, bad requst. Please try again.`, {
    timeout: 2000,
  });

export const endColection = () =>
  Notify.info(`We're sorry, but you've reached the end of search results.`, {
    timeout: 2000,
  });

export const totalHits = totalHits =>
  Notify.info(`Hooray! We found ${totalHits} images.`, {
    timeout: 2000,
  });

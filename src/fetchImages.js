import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const KEY = '32223150-dddf312f26d3017ef1e9616a6';

function params(searchQuery, nextPage) {
  return {
    params: {
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: '40',
      page: `${nextPage}`, //*---------*
    },
  };
}

export async function fetchImages(searchQuery, nextPage) {
  try {
    const response = await axios.get(
      `/api/?key=${KEY}`,
      params(searchQuery, nextPage)
    );
    const data = await response.data;

    return data;
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

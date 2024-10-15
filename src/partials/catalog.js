import {
  getTrending,
  getUpcoming,
  searchFilm,
  getDetails,
  logData,
  getTrailer,
  getCountries,
} from './API.js';

import { createElement } from './card_creator.js';

const form = document.querySelector('#searchForm');
const catalog = document.querySelector('#catalog');

const renderElements = (films, rootList) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...films.map(createElement));

  rootList.append(fragment);
};

form.addEventListener('submit', e => {
  e.preventDefault();
});

(async () => {
  try {
    const response = await getTrending('day');
    console.log(response.results);
    renderElements(response.results, catalog);
  } catch (error) {
    console.log(error);
  }
})();

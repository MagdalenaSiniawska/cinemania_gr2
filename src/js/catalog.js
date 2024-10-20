import { getTrending, getDetails } from './API.js';

import { element, createElement } from './card_creator.js';

import { openDetailsModal } from './hero_modals.js';

import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const catalog = document.querySelector('.catalog');
const form = document.querySelector('#searchForm');
const filmList = document.querySelector('#film-list');
const input = document.querySelector('#searchForm-input');
const inputClear = document.querySelector('#searchForm-input-clear');
const pagination = document.querySelector('#pagination');

pagination.style.display = 'flex';
inputClear.style.display = 'none';

const renderElements = (films, rootList, callback) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...films.map(callback));

  rootList.append(fragment);
};

(async () => {
  try {
    const response = await getTrending('day');
    renderElements(response.results, filmList, createElement);
  } catch (error) {
    catalog.innerHTML =
      '<h2>OOPS!</h2><p>We are very sorry! We don’t have any results matching your search.</p>';
    console.log(error);
  }
})();

let currentPage = 1;
const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2IxMWQ4ZGE0NTZlOGI5OTIxM2EyNDk4ODM4OGQyNSIsIm5iZiI6MTcyODcyMDEzMC44MDY0Niwic3ViIjoiNjcwYTJiNDEzYmI0NTU3YzY2OWFmYzM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Pgojbxf9JKo_J1qf6Qmglon5qZgkr9wpZ4I978dGQU8';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = API_KEY;

const searchMovies = async () => {
  try {
    const params = new URLSearchParams({
      query: input.value.trim(),
      include_adult: false,
      page: currentPage,
    });
    const response = await axios.get(`/search/movie?${params}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const search = async () => {
  try {
    const response = await searchMovies();
    filmList.innerHTML = '';
    renderElements(response.results, filmList, createElement);
  } catch (error) {
    console.log(error);
  }
};

const createPagination = async () => {
  try {
    const response = await searchMovies();
    const totalPages = response.total_pages;
    const visibleButtons = 5;

    pagination.innerHTML = '';
    pagination.style.display = 'flex';
    const prevEl = element('li', { classList: 'pagination-item' });
    const prevButton = element('button', {
      classList: 'pagination-btn prev-page',
      id: 'previous-page',
      textContent: '<',
    });
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        search();
        createPagination();
      }
    });
    prevEl.append(prevButton);
    pagination.append(prevEl);

    const pageList = element('ul', { classList: 'page-list' });
    pagination.append(pageList);
    pageList.style.display = 'flex';

    let startPage = Math.max(1, currentPage - Math.floor(visibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + visibleButtons - 1);

    if (endPage - startPage < visibleButtons - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + visibleButtons - 1);
      } else {
        startPage = Math.max(1, endPage - visibleButtons + 1);
      }
    }

    if (startPage > 1) {
      const firstPageButton = element('li', { classList: 'pagination-item' });
      const firstButton = element('button', {
        classList: 'pagination-btn',
        textContent: '1',
      });
      firstButton.addEventListener('click', () => {
        currentPage = 1;
        search();
        createPagination();
      });
      firstPageButton.append(firstButton);
      pageList.append(firstPageButton);

      if (startPage > 2) {
        const ellipsis = element('li', {
          classList: 'pagination-item',
          textContent: '...',
        });
        pageList.append(ellipsis);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const listEl = element('li', { classList: 'pagination-item' });
      const pageButton = element('button', {
        classList: 'pagination-btn',
        textContent: i,
      });
      pageButton.addEventListener('click', () => {
        currentPage = i;
        search();
        createPagination();
      });
      listEl.append(pageButton);
      pageList.append(listEl);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis = element('li', {
          classList: 'pagination-item',
          textContent: '...',
        });
        pageList.append(ellipsis);
      }

      const lastPageButton = element('li', { classList: 'pagination-item' });
      const lastButton = element('button', {
        classList: 'pagination-btn',
        textContent: totalPages,
      });
      lastButton.addEventListener('click', () => {
        currentPage = totalPages;
        search();
        createPagination();
      });
      lastPageButton.append(lastButton);
      pageList.append(lastPageButton);
    }

    const nextEl = element('li', { classList: 'pagination-item' });
    const nextButton = element('button', {
      classList: 'pagination-btn next-page',
      id: 'next-page',
      textContent: '>',
    });
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        search();
        createPagination();
      }
    });
    nextEl.append(nextButton);
    pagination.append(nextEl);

    if (currentPage === 1) {
      prevButton.disabled = true;
    }
    if (currentPage === totalPages) {
      nextButton.disabled = true;
    }
    const buttons = Array.from(
      document.querySelectorAll('.pagination-btn')
    ).slice(1, -1);
    buttons.forEach(button => {
      if (button.textContent == currentPage) {
        button.style.backgroundColor = 'red';
      }
    });
    console.log(buttons);
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();

  if (input.value !== '') {
    filmList.innerHTML = '';
    pagination.innerHTML = '';

    (async () => {
      currentPage = 1;

      await search();

      if (filmList.childElementCount === 0) {
        pagination.style.display = 'none';
        catalog.innerHTML =
          '<h2>OOPS!</h2><p>We are very sorry! We don’t have any results matching your search.</p>';
      }
      await createPagination();
    })();

    inputClear.style.display = 'inline';
  } else {
    iziToast.info({
      message: 'Type film title.',
    });
  }
});

inputClear.addEventListener('click', e => {
  inputClear.style.display = 'none';
  pagination.style.display = 'none';
});

// filmList.addEventListener('click', e => {
//   e.preventDefault();
//   if (!e.target.classList.contains('card-poster')) return;

//   async () => {
//     const details = await getDetails(movie.id);
//     openDetailsModal(details);
//   };
// });

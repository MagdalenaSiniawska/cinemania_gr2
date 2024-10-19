import { getTrending } from './API.js';

import { element, createElement } from './card_creator.js';

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
    renderElements(response.results, filmList, createElement);
  } catch (error) {
    console.log(error);
  }
};

const createPagination = async () => {
  try {
    const response = await searchMovies();
    const prevEl = element('li', {
      classList: 'pagination-item',
    });
    const prevButton = element('button', {
      classList: 'pagination-btn prev-page',
      id: 'previous-page',
      textContent: '<',
    });
    prevEl.append(prevButton);
    pagination.prepend(prevEl);

    const listEl = element('li', {
      classList: 'pagination-item',
    });
    const pageList = element('ul', {
      classList: 'page-list',
    });
    listEl.append(pageList);
    pagination.append(listEl);

    for (let i = 1; i <= response.total_pages; i++) {
      const listEl = element('li', {
        classList: 'pagination-item',
      });
      const pageButton = element('button', {
        classList: 'pagination-btn',
        textContent: i,
      });
      listEl.append(pageButton);
      pageList.append(listEl);
    }

    const nextEl = element('li', {
      classList: 'pagination-item',
    });
    const nextButton = element('button', {
      classList: 'pagination-btn next-page',
      id: 'next-page',
      textContent: '>',
    });
    nextEl.append(nextButton);
    pagination.append(nextEl);
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();

  if (input.value !== '') {
    filmList.innerHTML = '';
    pagination.innerHTML = '';
    pagination.style.display = 'flex';

    (async () => {
      currentPage = 1;

      await search();

      if (filmList.childElementCount === 0) {
        pagination.style.display = 'none';
        catalog.innerHTML =
          '<h2>OOPS!</h2><p>We are very sorry! We don’t have any results matching your search.</p>';
      }

      await createPagination();
      const pageList = document.querySelector('.page-list');
      pageList.style.display = 'flex';
      const prevButton = document.querySelector('#previous-page');
      const nextButton = document.querySelector('#next-page');
      const totalPages = pageList.childElementCount;

      const pageBtns = Array.from(
        document.querySelectorAll('.pagination-btn')
      ).slice(1, -1);
      pageBtns.forEach(button => {
        button.addEventListener('click', () => {
          currentPage = button.textContent;
          filmList.innerHTML = '';
          search();

          if (currentPage == totalPages) {
            nextButton.disabled = true;
          } else {
            nextButton.disabled = false;
          }

          if (currentPage == 1) {
            prevButton.disabled = true;
          } else {
            prevButton.disabled = false;
          }
        });
      });

      prevButton.disabled = true;

      if (totalPages === 1) {
        nextButton.disabled = true;
      }

      prevButton.addEventListener('click', e => {
        currentPage--;
        filmList.innerHTML = '';
        search();
        if (currentPage === 1) {
          prevButton.disabled = true;
        }
        if (currentPage < totalPages) {
          nextButton.disabled = false;
        }
      });

      nextButton.addEventListener('click', e => {
        currentPage++;
        filmList.innerHTML = '';
        search();
        if (currentPage > 1) {
          prevButton.disabled = false;
        }
        if (currentPage === totalPages) {
          nextButton.disabled = true;
        }
      });
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

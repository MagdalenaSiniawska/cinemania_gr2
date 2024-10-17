import { getTrending } from './API.js';
import { rendering } from './catalog.js';

const catalog = document.querySelector('#catalog');
const cards = document.querySelectorAll('.card');

const perPage = 20;

const getPageList = (totalPages, page, maxLength) => {
  const range = (start, end) =>
    Array.from(Array(end - start + 1), (_, i) => i + start);

  const sideWidth = maxLength < 9 ? 1 : 2;
  const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  const rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

  if (totalPages <= maxLength) {
    return range(1, totalPages);
  }
  if (page <= maxLength - sideWidth - 1 - rightWidth) {
    return range(1, maxLength - sideWidth - 1).concat(
      0,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }
  if (page >= totalPages - sideWidth - 1 - rightWidth) {
    return range(1, sideWidth).concat(
      0,
      range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
    );
  }
  return range(1, sideWidth).concat(
    0,
    range(page - leftWidth, page + rightWidth),
    0,
    range(totalPages - sideWidth + 1, totalPages)
  );
};

const pagiogig = async () => {
  try {
    const response = await getTrending();
    const numberOfItems = response.total_results;
    const totalPages = Math.ceil(numberOfItems / perPage);
    const paginationSize = 7;
    let currentPage;
    const showPage = whichPage => {
      if (whichPage < 1 || whichPage > totalPages) return false;

      currentPage = whichPage;
    };

    console.log(totalPages);
  } catch (error) {
    console.log(error);
  }
};

pagiogig();

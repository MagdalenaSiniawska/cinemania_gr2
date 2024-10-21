import { getTrending, searchFilm } from './API.js';

import { createElement } from './card_creator.js';

const form = document.querySelector('#searchForm');
const catalog = document.querySelector('#catalog');
const genreSelect = document.querySelector('#genre-select');
const loadMoreBtn = document.querySelector('#load-more');
console.log(`load more: ${loadMoreBtn}`);

let displayedMovies = 0;
const moviesPerPage = 6;
let allMovies = [];

// Function to render elements
const renderElements = (films, rootList) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...films.map(createElement));
  rootList.append(fragment);
};

// Fetch trending movies and render on page load
(async () => {
  try {
    const response = await getTrending('day');
    allMovies = response.results;
    renderElements(allMovies.slice(0, moviesPerPage), catalog);
    displayedMovies += moviesPerPage;
  } catch (error) {
    console.log(error);
  }
})();

// Load More functionality
loadMoreBtn.addEventListener('click', () => {
  const moreMovies = allMovies.slice(
    displayedMovies,
    displayedMovies + moviesPerPage
  );
  renderElements(moreMovies, catalog);
  displayedMovies += moreMovies.length;

  // Hide Load More button if all movies are displayed
  if (displayedMovies >= allMovies.length) {
    loadMoreBtn.style.display = 'none';
  }
});

// Search functionality
form.addEventListener('submit', async e => {
  e.preventDefault();
  const searchQuery = document.querySelector('#searchInput').value;
  if (searchQuery) {
    try {
      const response = await searchFilm(searchQuery);
      catalog.innerHTML = '';
      allMovies = response.results;
      displayedMovies = 0;
      renderElements(allMovies.slice(0, moviesPerPage), catalog);
      displayedMovies += moviesPerPage;
    } catch (error) {
      console.log(error);
    }
  }
});

// Filter by genre
genreSelect.addEventListener('change', e => {
  const selectedGenre = e.target.value;
  let filteredMovies;

  if (selectedGenre === 'all') {
    filteredMovies = allMovies;
  } else {
    filteredMovies = allMovies.filter(movie =>
      movie.genre_ids.includes(Number(selectedGenre))
    );
  }

  catalog.innerHTML = ''; 
  renderElements(filteredMovies.slice(0, moviesPerPage), catalog);
  displayedMovies = moviesPerPage;
});




// Display empty state if no movies are in the library
const emptyLibrarySection = document.getElementById('empty-library');

if (allMovies.length === 0) {
  catalog.style.display = 'none';
  emptyLibrarySection.style.display = 'block';
} else {
  catalog.style.display = 'grid'; 
  emptyLibrarySection.style.display = 'none';
}


// Listen for genre selection change
genreSelect.addEventListener('change', (e) => {
  const selectedGenre = e.target.value;
  
 
  const options = document.querySelectorAll('#genre-select option');
  options.forEach(option => option.style.color = '#fff'); 
  
 
  const selectedOption = options[genreSelect.selectedIndex];
  selectedOption.style.color = 'orange';

  let filteredMovies;

  if (selectedGenre === 'all') {
    filteredMovies = allMovies;
  } else {
    filteredMovies = allMovies.filter(movie =>
      movie.genre_ids.includes(Number(selectedGenre))
    );
  }

  catalog.innerHTML = ''; 
  renderElements(filteredMovies.slice(0, moviesPerPage), catalog);
  displayedMovies = moviesPerPage;
});
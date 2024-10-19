import {
    getTrending,
    searchFilm
  } from './API.js';
  
  const form = document.querySelector('#searchForm');
  const catalog = document.querySelector('#catalog');
  const genreSelect = document.querySelector('#genre-select');
  const loadMoreBtn = document.getElementById('loadMore');
  
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
    const moreMovies = allMovies.slice(displayedMovies, displayedMovies + moviesPerPage);
    renderElements(moreMovies, catalog);
    displayedMovies += moreMovies.length;
  
    // Hide Load More button if all movies are displayed
    if (displayedMovies >= allMovies.length) {
      loadMoreBtn.style.display = 'none';
    }
  });
  
  // Search functionality
  form.addEventListener('submit', async (e) => {
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
  genreSelect.addEventListener('change', (e) => {
    const selectedGenre = e.target.value;
    let filteredMovies;
  
    if (selectedGenre === 'all') {
      filteredMovies = allMovies;
    } else {
      filteredMovies = allMovies.filter(movie => movie.genre_ids.includes(Number(selectedGenre)));
    }
  
    catalog.innerHTML = ''; // Clear current movies
    renderElements(filteredMovies.slice(0, moviesPerPage), catalog);
    displayedMovies = moviesPerPage;
  });
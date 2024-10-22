import {
  getTrending,
  getDetails,
  getUpcoming,
  searchFilm,
  convertGenreIdsToNames,
} from './API.js';

document.addEventListener('DOMContentLoaded', async () => {
  const catalog = document.querySelector('#catalog');
  const genreSelect = document.querySelector('#genre-select');
  const loadMoreBtn = document.querySelector('#load-more');
  const emptyLibrarySection = document.querySelector('#empty-library');

  let displayedMovies = 0;
  const moviesPerPage = 6;
  let allMovies = [];
  let filteredMovies = [];

  const populateGenres = () => {
    const defaultOption = document.createElement('option');
    defaultOption.value = 'all';
    defaultOption.textContent = 'Genre';
    genreSelect.appendChild(defaultOption);

    const genres = ['action', 'drama', 'comedy', 'horror', 'thriller'];
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre;
      option.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
      genreSelect.appendChild(option);
    });
  };

  const createStarElement = type => {
    const starElement = document.createElement('span');
    starElement.classList.add(`${type}-star`);
    starElement.innerHTML = type === 'empty' ? '&#9734;' : '&#9733;';
    return starElement;
  };

  const displayStarRating = rating => {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('star-rating');
    const normalizedRating = rating / 2;

    const fullStars = Math.floor(normalizedRating);
    const halfStar = normalizedRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    for (let i = 0; i < fullStars; i++) {
      starsContainer.appendChild(createStarElement('full'));
    }

    if (halfStar) {
      starsContainer.appendChild(createStarElement('half'));
    }

    for (let i = 0; i < emptyStars; i++) {
      starsContainer.appendChild(createStarElement('empty'));
    }

    return starsContainer.outerHTML;
  };

  const removeMovieFromLibrary = movieId => {
    // Usunięcie filmu z allMovies i LocalStorage
    allMovies = allMovies.filter(movie => movie.id !== movieId);
    localStorage.setItem('myLibrary', JSON.stringify(allMovies)); // Zaktualizowanie localStorage
    loadMovies(); // Ponowne załadowanie filmów
  };

  const renderMovies = (movies, container) => {
    const fragment = document.createDocumentFragment();

    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('film-card');

      const rating = movie.vote_average;

      movieElement.innerHTML = `
                <button class="remove-movie" data-id="${movie.id}">x</button>
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path || ''
                }" alt="${movie.title || ''} poster" class="film-poster"/>
                <div class ="film-card-descr">
                <h3 class ="film-card-title">${movie.title || ''}</h3>
                <p class ="film-card-genre">${
                  movie.genres.slice(0, 2).join(', ') || 'N/A'
                }</p>
                <p class ="film-card-year"> ${
                  new Date(movie.release_date).getFullYear() || ''
                }</p>
                <p class ="film-card-stars">${
                  displayStarRating(rating) || ''
                }</p>
                </div>
            `;

      const removeButton = movieElement.querySelector('.remove-movie');
      removeButton.addEventListener('click', () =>
        removeMovieFromLibrary(movie.id)
      );

      fragment.appendChild(movieElement);
    });

    container.append(fragment);
  };

  const fetchMoviesFromAPI = async () => {
    try {
      const response = await getTrending('day');
      allMovies = await Promise.all(
        response.results.map(async movie => {
          const details = await getDetails(movie.id);
          return {
            ...movie,
            genres: await convertGenreIdsToNames(details.genres.map(g => g.id)),
            poster_path: details.poster_path,
            release_date: details.release_date,
          };
        })
      );
      console.log('All movies fetched:', allMovies.length); // Logowanie liczby filmów
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const loadMovies = () => {
    catalog.innerHTML = '';
    filteredMovies = allMovies;

    if (!Array.isArray(allMovies) || allMovies.length === 0) {
      emptyLibrarySection.style.display = 'block'; // Wyświetlenie komunikatu o pustej bibliotece
      loadMoreBtn.style.display = 'none'; // Ukrycie przycisku "Load More"
      return;
    } else {
      emptyLibrarySection.style.display = 'none'; // Ukrycie komunikatu, jeśli są filmy
    }

    renderMovies(filteredMovies.slice(0, moviesPerPage), catalog);
    displayedMovies = Math.min(moviesPerPage, filteredMovies.length);

    updateLoadMoreButton();
    console.log('Displayed movies:', displayedMovies);
    console.log('Filtered movies:', filteredMovies.length);
  };

  const updateLoadMoreButton = () => {
    loadMoreBtn.style.display =
      displayedMovies < filteredMovies.length ? 'block' : 'none';
  };

  loadMoreBtn.addEventListener('click', () => {
    const moreMovies = filteredMovies.slice(
      displayedMovies,
      displayedMovies + moviesPerPage
    );

    renderMovies(moreMovies, catalog);
    displayedMovies += moreMovies.length;

    updateLoadMoreButton();
    console.log('Displayed movies after loading more:', displayedMovies);
  });

  genreSelect.addEventListener('change', e => {
    const selectedGenre = e.target.value;

    filteredMovies = allMovies.filter(movie => {
      return (
        selectedGenre === 'all' ||
        (Array.isArray(movie.genres) &&
          movie.genres.map(g => g.toLowerCase()).includes(selectedGenre))
      );
    });

    catalog.innerHTML = '';
    renderMovies(filteredMovies.slice(0, moviesPerPage), catalog);
    displayedMovies = Math.min(moviesPerPage, filteredMovies.length);

    updateLoadMoreButton();
    console.log('Filtered movies after genre change:', filteredMovies.length);
  });

  populateGenres();
  await fetchMoviesFromAPI();
  loadMovies();
});

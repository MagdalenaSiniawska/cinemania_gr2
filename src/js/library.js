document.addEventListener('DOMContentLoaded', () => {
  const catalog = document.querySelector('#catalog');
  const genreSelect = document.querySelector('#genre-select');
  const loadMoreBtn = document.querySelector('#load-more');
  const catFilms = document.querySelector('.catalog-films');

  let displayedMovies = 0;
  const moviesPerPage = 6;
  let allMovies = [];
  let filteredMovies = [];

  const genres = ['action', 'adventure', 'animation', 'comedy', 'crime', 'documentary', 'drama', 'family', 'fantasy', 'horror', 'kids', 'mystery', 'news', 'politics', 'reality', 'sci-fi', 'soap', 'talk', 'thriller', 'war', 'western'];

  const populateGenres = () => {
    const defaultOption = document.createElement('option');
    defaultOption.value = 'all';
    defaultOption.textContent = 'Genre';
    genreSelect.appendChild(defaultOption);

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

  const renderMovies = (movies, container) => {
    const fragment = document.createDocumentFragment();

    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('film-card');
      const rating = movie.vote_average;

      const posterUrl = movie.poster ? `https://image.tmdb.org/t/p/w500${movie.poster}` : 'default-image-url.jpg';

      movieElement.innerHTML = `
                <button class="remove-movie" aria-label="Remove movie" data-title="${movie.title}">&times;</button>
                <img src="${posterUrl}" alt="${movie.title || ''} poster" class="film-poster"/>
                <div class ="film-card-descr">
                  <h3 class ="film-card-title">${movie.title || ''}</h3>
                  <p class ="film-card-genre">${movie.genres?.slice(0, 2).join(', ') || 'N/A'}</p>
                  <p class ="film-card-year">${movie.year || ''}</p>
                  <p class ="film-card-stars">${displayStarRating(rating) || ''}</p>
                </div>
            `;

      const removeButton = movieElement.querySelector('.remove-movie');

      // Dodanie funkcji usuwania filmu
      removeButton.addEventListener('click', () => {
        const movieTitle = movie.title; // Pobieramy tytuł filmu z obiektu "movie"

        let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

        // Sprawdzamy, czy mamy w bibliotece film o tym tytule
        const updatedLibrary = myLibrary.filter(m => m.title !== movieTitle);

        // Aktualizacja localStorage po usunięciu filmu
        localStorage.setItem('myLibrary', JSON.stringify(updatedLibrary));

        // Odświeżenie wyświetlania filmów po usunięciu
        loadMovies();
      });

      fragment.appendChild(movieElement);
    });

    container.append(fragment);
  };

  const fetchMoviesFromLibrary = () => {
    const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
    return Array.isArray(myLibrary) ? myLibrary : [];
  };

  const loadMovies = () => {
    allMovies = fetchMoviesFromLibrary();
    catFilms.innerHTML = '';
    filteredMovies = allMovies;

    if (!Array.isArray(allMovies) || allMovies.length === 0) {
      console.warn('No movies found in library or library is not an array.');
      document.querySelector('#empty-library').style.display = '';
      loadMoreBtn.style.display = 'none';
      return;
    }

    renderMovies(filteredMovies.slice(0, moviesPerPage), catFilms);
    displayedMovies = Math.min(moviesPerPage, filteredMovies.length);

    loadMoreBtn.style.display =
      displayedMovies >= filteredMovies.length ? 'none' : 'block';
  };

  loadMoreBtn.addEventListener('click', () => {
    const moreMovies = filteredMovies.slice(
      displayedMovies,
      displayedMovies + moviesPerPage
    );
    renderMovies(moreMovies, catFilms);
    displayedMovies += moreMovies.length;

    loadMoreBtn.style.display =
      displayedMovies >= filteredMovies.length ? 'none' : 'block';
  });

  genreSelect.addEventListener('change', e => {
    const selectedGenre = e.target.value;

    filteredMovies = allMovies.filter(movie => {
      return (
        selectedGenre === 'all' ||
        (movie.genres && movie.genres.map(g => g.toLowerCase()).includes(selectedGenre))
      );
    });

    catFilms.innerHTML = '';
    renderMovies(filteredMovies.slice(0, moviesPerPage), catFilms);
    displayedMovies = Math.min(moviesPerPage, filteredMovies.length);

    loadMoreBtn.style.display =
      displayedMovies >= filteredMovies.length ? 'none' : 'block';
  });

  const searchMovieBtn = document.querySelector('.lib-empty-library-btn');
  searchMovieBtn.addEventListener('click', () => {
    window.location.href = 'catalog.html';
  });

  populateGenres();
  loadMovies();
});

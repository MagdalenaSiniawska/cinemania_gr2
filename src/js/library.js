document.addEventListener('DOMContentLoaded', () => {
  const catalog = document.querySelector('#catalog');
  const genreSelect = document.querySelector('#genre-select');
  const loadMoreBtn = document.querySelector('#load-more');

  let displayedMovies = 0;
  const moviesPerPage = 6;
  let allMovies = [];
  let filteredMovies = []; // Zmienna do przechowywania przefiltrowanych filmów

  // Lista gatunków (w małych literach)
  const genres = ['action', 'drama', 'comedy', 'horror', 'thriller'];

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
      console.log(movie);
      const rating = movie.vote_average;

      movieElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster || ''
                }" alt="${movie.title || ''} poster" class="film-poster"/>
                <div class ="film-card-descr">
                <h3 class ="film-card-title">${movie.title || ''}</h3>
                <p class ="film-card-genre">${
                  movie.genres.slice(0, 2).join(', ') || 'N/A'
                }</p>
                <p class ="film-card-year"> ${movie.year || ''}</p>
                <p class ="film-card-stars">${
                  displayStarRating(rating) || ''
                }</p>
                </div>
            `;
      fragment.appendChild(movieElement);
    });

    container.append(fragment);
  };

  const fetchMoviesFromLibrary = () => {
    const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
    return Array.isArray(myLibrary) ? myLibrary : [];
  };

  const catFilms = document.querySelector('.catalog-films');
  const loadMovies = () => {
    allMovies = fetchMoviesFromLibrary();
    catFilms.innerHTML = '';
    filteredMovies = allMovies; // Na początku wyświetlamy wszystkie filmy

    if (!Array.isArray(allMovies) || allMovies.length === 0) {
      console.warn('No movies found in library or library is not an array.');
      document.querySelector('#empty-library').style.display = 'block';
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

  // Filtrowanie po kategorii wśród zapisanych filmów
  genreSelect.addEventListener('change', e => {
    const selectedGenre = e.target.value;

    // Filtrowanie filmów
    filteredMovies = allMovies.filter(movie => {
      return (
        selectedGenre === 'all' ||
        movie.genres.map(g => g.toLowerCase()).includes(selectedGenre)
      );
    });

    catFilms.innerHTML = '';
    renderMovies(filteredMovies.slice(0, moviesPerPage), catFilms);
    displayedMovies = Math.min(moviesPerPage, filteredMovies.length);

    loadMoreBtn.style.display =
      displayedMovies >= filteredMovies.length ? 'none' : 'block';
  });

  // Ładowanie zapisanych filmów po załadowaniu strony
  populateGenres(); // Dodaj gatunki do selecta
  loadMovies();
});

//Genre
const genreSelect = document.querySelector('#genre-select');
genreSelect.addEventListener('change', e => {
  const selectedGenre = e.target.value;

  const options = document.querySelectorAll('#genre-select option');
  options.forEach(option => (option.style.color = '#fff'));

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

  catFilms.innerHTML = '';
  renderElements(filteredMovies.slice(0, moviesPerPage), catFilms);
  displayedMovies = moviesPerPage;
});

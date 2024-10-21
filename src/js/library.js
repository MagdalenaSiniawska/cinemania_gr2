document.addEventListener('DOMContentLoaded', () => {
  const catalog = document.querySelector('#catalog');
  const genreSelect = document.querySelector('#genre-select');
  const loadMoreBtn = document.querySelector('#load-more');

  let displayedMovies = 0;
  const moviesPerPage = 6;
  let allMovies = [];
  let filteredMovies = []; // Zmienna do przechowywania przefiltrowanych filmów

<<<<<<< Updated upstream
  // Lista gatunków (w małych literach)
  const genres = ['action', 'drama', 'comedy', 'horror', 'thriller'];
=======
    let displayedMovies = 0;
    const moviesPerPage = 3;
    let allMovies = [];
    let filteredMovies = [];
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  const renderMovies = (movies, container) => {
    const fragment = document.createDocumentFragment();
=======
    const removeMovieFromLibrary = (movieId) => {
        allMovies = allMovies.filter(movie => movie.id !== movieId);
        localStorage.setItem('myLibrary', JSON.stringify(allMovies));
        loadMovies();
    };
>>>>>>> Stashed changes

    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('film-card');

      const rating = movie.vote_average;

<<<<<<< Updated upstream
      movieElement.innerHTML = `
                <img src="${movie.poster || ''}" alt="${
        movie.title || ''
      } poster" class="film-poster"/>
                <h3>${movie.title || ''}</h3>
                <p>Genre: ${
                  Array.isArray(movie.genres) && movie.genres.length > 0
                    ? movie.genres.join(', ')
                    : 'N/A'
                }</p>
                <p>Year: ${movie.year || ''}</p>
                <p>${displayStarRating(rating) || ''}</p>
            `;
      fragment.appendChild(movieElement);
=======
            const rating = movie.vote_average;

            movieElement.innerHTML = `
                <button class="remove-movie" data-id="${movie.id}">X</button>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path || ''}" alt="${movie.title || ''} poster" class="film-poster"/>
                <div class="info">
                    <h3>${movie.title || ''}</h3>
                    <p>${movie.genres.join(', ') || 'N/A'} | ${new Date(movie.release_date).getFullYear() || ''}</p>
                    <p>${displayStarRating(rating) || ''}</p>
                </div>
            `;

            const removeButton = movieElement.querySelector('.remove-movie');
            removeButton.addEventListener('click', () => removeMovieFromLibrary(movie.id));

            fragment.appendChild(movieElement);
        });

        container.append(fragment);
    };

    const fetchMoviesFromAPI = async () => {
        try {
            const response = await getTrending('day'); 
            allMovies = await Promise.all(response.results.map(async movie => {
                const details = await getDetails(movie.id);
                return {
                    ...movie,
                    genres: await convertGenreIdsToNames(details.genres.map(g => g.id)),
                    poster_path: details.poster_path,
                    release_date: details.release_date,
                };
            }));
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const loadMovies = () => {
        catalog.innerHTML = '';
        filteredMovies = allMovies; 

        if (!Array.isArray(allMovies) || allMovies.length === 0) {
            emptyLibrarySection.style.display = 'block';
            loadMoreBtn.style.display = 'none';
            return;
        } else {
            emptyLibrarySection.style.display = 'none';
        }

        renderMovies(filteredMovies.slice(0, moviesPerPage), catalog);
        displayedMovies = Math.min(moviesPerPage, filteredMovies.length);

        updateLoadMoreButton();
    };

    const updateLoadMoreButton = () => {
        loadMoreBtn.style.display = displayedMovies < filteredMovies.length ? 'block' : 'none';
    };

    loadMoreBtn.addEventListener('click', () => {
        const moreMovies = filteredMovies.slice(
            displayedMovies,
            displayedMovies + moviesPerPage
        );
        
        renderMovies(moreMovies, catalog);
        displayedMovies += moreMovies.length;

        updateLoadMoreButton();
>>>>>>> Stashed changes
    });

    container.append(fragment);
  };

  const fetchMoviesFromLibrary = () => {
    const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
    return Array.isArray(myLibrary) ? myLibrary : [];
  };

  const loadMovies = () => {
    allMovies = fetchMoviesFromLibrary();
    // catalog.innerHTML = '';
    filteredMovies = allMovies; // Na początku wyświetlamy wszystkie filmy

<<<<<<< Updated upstream
    if (!Array.isArray(allMovies) || allMovies.length === 0) {
      console.warn('No movies found in library or library is not an array.');
      return;
    }

    renderMovies(filteredMovies.slice(0, moviesPerPage), catalog);
    displayedMovies = Math.min(moviesPerPage, filteredMovies.length);

    loadMoreBtn.style.display =
      displayedMovies >= filteredMovies.length ? 'none' : 'block';
  };

  loadMoreBtn.addEventListener('click', () => {
    const moreMovies = filteredMovies.slice(
      displayedMovies,
      displayedMovies + moviesPerPage
    );
    renderMovies(moreMovies, catalog);
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

    // catalog.innerHTML = '';
    renderMovies(filteredMovies.slice(0, moviesPerPage), catalog);
    displayedMovies = Math.min(moviesPerPage, filteredMovies.length);

    loadMoreBtn.style.display =
      displayedMovies >= filteredMovies.length ? 'none' : 'block';
  });

  // Ładowanie zapisanych filmów po załadowaniu strony
  populateGenres(); // Dodaj gatunki do selecta
  loadMovies();
=======
        updateLoadMoreButton();
    });

    populateGenres();
    await fetchMoviesFromAPI();
    loadMovies();
>>>>>>> Stashed changes
});

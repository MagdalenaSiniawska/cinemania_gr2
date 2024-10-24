import { getTrending, getUpcoming, convertGenreIdsToNames } from './API.js';
import { openDetailsModal } from './hero_modals.js';

const renderStars = rating => {
  const totalStars = 5;
  const roundedRating = Math.round(rating * 2) / 2;

  const fullStars = Math.floor(roundedRating);
  const halfStar = roundedRating % 1 === 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStar;

  let starHTML = '';

  for (let i = 0; i < fullStars; i++) {
    starHTML += `<svg class="icon"><use xlink:href="#icon-star"></use></svg>`;
  }
  if (halfStar) {
    starHTML += `<svg class="icon"><use xlink:href="#icon-star-half"></use></svg>`;
  }
  for (let i = 0; i < emptyStars; i++) {
    starHTML += `<svg class="icon"><use xlink:href="#icon-star-empty"></use></svg>`;
  }

  return starHTML;
};

const renderTrendingMovies = async () => {
  try {
    const trendingData = await getTrending('week');
    const trendingMovies = trendingData.results;

    const trendingContainer = document.querySelector('#trending-container');

    const numberOfCards = window.innerWidth < 768 ? 1 : 3;

    trendingContainer.innerHTML = '';

    for (const movie of trendingMovies.slice(0, numberOfCards)) {
      const genreNames = await convertGenreIdsToNames(movie.genre_ids);
      const limitedGenreNames = genreNames.slice(0, 2);
      const genreText = limitedGenreNames.join(', ');

      const movieElement = document.createElement('div');
      movieElement.classList.add('trending-card');
      movieElement.setAttribute('data-movie-id', movie.id);

      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

      movieElement.innerHTML = `
        <img src="${posterUrl}" alt="${movie.title}">
        <h3>${movie.title.toUpperCase()}</h3>
        <p>${genreText} | ${new Date(
        movie.release_date
      ).getFullYear()} ${renderStars(movie.vote_average / 2)}</p>
      `;

      movieElement.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;

      movieElement.innerHTML = `
  <div class="card-info">
    <h3>${movie.title.toUpperCase()}</h3>
    <div class="card-info-inner">
      <div class="card-info-left">
        <p class="card-info-p">${genreText} | ${new Date(
        movie.release_date
      ).getFullYear()}</p>
      </div>
      <div class="card-info-right">
        ${renderStars(movie.vote_average / 2)}
      </div>
    </div>
  </div>
`;

      movieElement.addEventListener('click', async () => {
        const movieDetails = {
          ...movie,
          genres: genreNames.map(name => ({ name })),
        };
        openDetailsModal(movieDetails);
      });

      trendingContainer.appendChild(movieElement);
    }
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
};

const isMovieInLibrary = movieId => {
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  return library.some(movie => movie.id === movieId);
};

const addMovieToLibrary = movie => {
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const movieToAdd = {
    id: movie.id,
    title: movie.title,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    popularity: movie.popularity,
    overview: movie.overview,
    genre_ids: movie.genre_ids,
  };
  library.push(movieToAdd);
  localStorage.setItem('myLibrary', JSON.stringify(library));
};

const removeMovieFromLibrary = movieId => {
  let library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  library = library.filter(movie => movie.id !== movieId);
  localStorage.setItem('myLibrary', JSON.stringify(library));
};

const handleLibraryToggle = (movie, button) => {
  const movieWithFullPoster = {
    ...movie,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };

  if (isMovieInLibrary(movieWithFullPoster.id)) {
    removeMovieFromLibrary(movieWithFullPoster.id);
    button.textContent = 'Add to my library';
  } else {
    addMovieToLibrary(movieWithFullPoster);
    button.textContent = 'Remove from my library';
  }
};

const renderUpcomingMovie = async () => {
  try {
    const upcomingData = await getUpcoming();
    const upcomingMovies = upcomingData.results;
    const movie = upcomingMovies[Math.floor(Math.random() * 10)];
    console.log(movie);

    const genreNames = await convertGenreIdsToNames(movie.genre_ids);
    const genreText = genreNames.join(', ');

    document.getElementById(
      'upcoming-movie-poster'
    ).src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    document.getElementById('upcoming-movie-title').textContent = movie.title;
    document.getElementById('upcoming-release-date').textContent =
      movie.release_date;

    document.querySelector('.vote-average').textContent =
      movie.vote_average.toFixed(1);
    document.querySelector('.vote-count').textContent = movie.vote_count;

    document.getElementById('upcoming-popularity').textContent =
      movie.popularity.toFixed(1);
    document.getElementById('upcoming-overview').textContent = movie.overview;
    document.getElementById('upcoming-genre').textContent = genreText;

    const addLibraryButton = document.getElementById('add-library-button');
    addLibraryButton.textContent = isMovieInLibrary(movie.id)
      ? 'Remove from my library'
      : 'Add to my library';

    addLibraryButton.addEventListener('click', event => {
      const movieToAdd = {
        title: movie.title,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        popularity: movie.popularity,
        genres: movie.genre_ids.map(genre => genre.name),
        overview: movie.overview,
        year: new Date(movie.release_date).getFullYear(),
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      };

      // Sprawdź, czy film jest już w bibliotece
      const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
      const movieExists = myLibrary.some(
        item => item.title === movieToAdd.title
      );

      if (!movieExists) {
        addMovieToLibrary(movieToAdd);
        addLibraryButton.textContent = 'Remove from my library'; // Zmień tekst przycisku
      } else {
        removeMovieFromLibrary(movieToAdd.title);
        addLibraryButton.textContent = 'Add to my library'; // Zmień tekst przycisku
      }
    });

    // Funkcja dodawania filmu do localStorage
    function addMovieToLibrary(movie) {
      const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
      myLibrary.push(movie);
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
      alert(`${movie.title} has been added to your library!`); // Użycie alertu
    }

    // Funkcja usuwania filmu z localStorage
    function removeMovieFromLibrary(movieTitle) {
      let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
      myLibrary = myLibrary.filter(movie => movie.title !== movieTitle);
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
      alert(`${movieTitle} has been removed from your library!`); // Użycie alertu
    }

    // Inicjalizacja przycisku na podstawie obecności filmu w localStorage
    function initializeLibraryButton(film) {
      const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
      const movieExists = myLibrary.some(mov => mov.title === movie.title);

      if (movieExists) {
        addLibraryButton.textContent = 'Remove from My Library';
      } else {
        addLibraryButton.textContent = 'Add to my Library';
      }
    }

    initializeLibraryButton(movie);
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    document.getElementById('upcoming-no-movies-message').style.display =
      'block';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderTrendingMovies();
  renderUpcomingMovie();
  window.addEventListener('resize', renderTrendingMovies);
});

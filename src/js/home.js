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

    for (const movie of trendingMovies.slice(0, 3)) {
      const genreNames = await convertGenreIdsToNames(movie.genre_ids);

      const limitedGenreNames = genreNames.slice(0, 2);
      const genreText = limitedGenreNames.join(', ');

      const movieElement = document.createElement('div');
      movieElement.classList.add('trending-card');
      movieElement.setAttribute('data-movie-id', movie.id);

      const posterUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
      
      console.log('Poster URL:', posterUrl);

      movieElement.innerHTML = `
        <img src="${posterUrl}" alt="${movie.title}">
        <h3>${movie.title.toUpperCase()}</h3>
        <p>${genreText} | ${new Date(movie.release_date).getFullYear()} ${renderStars(movie.vote_average / 2)}</p>
      `;

      movieElement.addEventListener('click', async () => {
        const movieDetails = {
          ...movie,
          genres: genreNames,
        };
        openDetailsModal(movieDetails);
      });

      trendingContainer.appendChild(movieElement);
    }
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
};

// Sprawdza, czy film jest w bibliotece
const isMovieInLibrary = movieId => {
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  return library.some(movie => movie.id === movieId);
};

// Dodaje film do biblioteki
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
    genre_ids: movie.genre_ids
  };
  library.push(movieToAdd);
  localStorage.setItem('myLibrary', JSON.stringify(library));
};

// Usuwa film z biblioteki
const removeMovieFromLibrary = movieId => {
  let library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  library = library.filter(movie => movie.id !== movieId);
  localStorage.setItem('myLibrary', JSON.stringify(library));
};

const handleLibraryToggle = (movie, button) => {
  const movieWithFullPoster = {
    ...movie,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
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
    const movie = upcomingMovies[0];

    const genreNames = await convertGenreIdsToNames(movie.genre_ids);
    const genreText = genreNames.join(', ');

    document.getElementById(
      'upcoming-movie-poster'
    ).src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    document.getElementById('upcoming-movie-title').textContent = movie.title;
    document.getElementById('upcoming-release-date').textContent =
      movie.release_date;
    document.getElementById(
      'upcoming-vote'
    ).textContent = `${movie.vote_average} / ${movie.vote_count}`;
    document.getElementById('upcoming-popularity').textContent =
      movie.popularity;
    document.getElementById('upcoming-overview').textContent = movie.overview;
    document.getElementById('upcoming-genre').textContent = genreText;

    // Przycisk "Add/Remove from library"
    const addLibraryButton = document.getElementById('add-library-button');
    addLibraryButton.textContent = isMovieInLibrary(movie.id)
      ? 'Remove from my library'
      : 'Add to my library';

    addLibraryButton.addEventListener('click', () =>
      handleLibraryToggle(movie, addLibraryButton)
    );
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    document.getElementById('upcoming-no-movies-message').style.display =
      'block';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderTrendingMovies();
  renderUpcomingMovie();
});

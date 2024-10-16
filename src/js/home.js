import {
  getTrending,
  getUpcoming,
  convertGenreIdsToNames,
} from '../partials/API.js';

const renderStars = rating => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  let starHTML = '';

  for (let i = 0; i < fullStars; i++) {
    starHTML += '★'; // trzeba będzie dodać gwiazdki z projektu
  }
  if (halfStar) {
    starHTML += '☆'; // trzeba będzie dodać gwiazdki z projektu TUTAJ POL!!!
  }
  for (let i = 0; i < emptyStars; i++) {
    starHTML += '☆'; //trzeba będzie dodać gwiazdki z projektu
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
      const genreText = genreNames.join(', ');

      const movieElement = document.createElement('div');
      movieElement.classList.add('trending-card');
      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
        movie.title
      }">
        <h3>${movie.title.toUpperCase()}</h3>
         <p> ${renderStars(movie.vote_average / 2)}</p> 
        <p> ${genreText} | ${new Date(movie.release_date).getFullYear()}</p>
      `;
      trendingContainer.appendChild(movieElement);
    }
  } catch (error) {
    console.error('Error fetching trending movies:', error);
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

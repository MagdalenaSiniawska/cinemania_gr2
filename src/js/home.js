import { getTrending, getUpcoming } from '../partials/API.js';

// Funkcja do renderowania listy filmów w sekcji "Weekly Trends"
const renderTrendingMovies = async () => {
  try {
    const trendingData = await getTrending('week');
    const trendingMovies = trendingData.results;

    // Znajdujemy element, w którym będziemy wyświetlać filmy
    const trendingContainer = document.querySelector('#trending-container');

    // Tworzymy HTML dla każdego filmu
    trendingMovies.slice(0, 3).forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('trending-card');

      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
        movie.title
      }">
        <h3>${movie.title.toUpperCase()}</h3>
        <p>Rating: ${movie.vote_average} ★</p>
        <p>${new Date(movie.release_date).getFullYear()}</p>
      `;

      trendingContainer.appendChild(movieElement);
    });
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
};

// Funkcja do renderowania nadchodzących filmów w sekcji "Upcoming This Month"
const renderUpcomingMovie = async () => {
  try {
    const upcomingData = await getUpcoming();
    const upcomingMovies = upcomingData.results;

    // Wybieramy pierwszy nadchodzący film
    const movie = upcomingMovies[0];

    // Znajdujemy elementy HTML do wypełnienia danymi
    document.getElementById(
      'movie-poster'
    ).src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('release-date').textContent = movie.release_date;
    document.getElementById(
      'vote'
    ).textContent = `${movie.vote_average} / ${movie.vote_count}`;
    document.getElementById('popularity').textContent = movie.popularity;
    document.getElementById('overview').textContent = movie.overview;

    // Dodatkowe przetwarzanie gatunków filmów (jeśli potrzebne)
    const genreText = movie.genre_ids.join(', '); // Zazwyczaj będziesz potrzebować mapowania ID na nazwy gatunków
    document.getElementById('genre').textContent = genreText;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    document.getElementById('no-movies-message').style.display = 'block';
  }
};

// Wywołanie funkcji, aby pobrać i wyświetlić dane po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
  renderTrendingMovies();
  renderUpcomingMovie();
});

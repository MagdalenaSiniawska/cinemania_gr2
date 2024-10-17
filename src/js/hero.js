import { getTrending, getDetails, getTrailer } from './API.js'; 
import { openDetailsModal, openTrailerModal } from './hero_modals.js';

const heroElement = document.querySelector('.hero');
const defaultHeroContent = `
  <div class="hero-content">
    <h1>Welcome to Movie Catalog</h1>
    <button id="get-started">Get Started</button>
  </div>
`;

// Wyświetlanie gwiazdek jako rating
const displayStarRating = (rating) => {
  const starsContainer = document.createElement('div');
  starsContainer.classList.add('star-rating');

  const fullStars = Math.floor(rating / 2);
  const halfStar = (rating % 2) >= 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  for (let i = 0; i < fullStars; i++) {
    const starElement = document.createElement('span');
    starElement.innerHTML = '&#9733;';
    starElement.classList.add('full-star');
    starsContainer.appendChild(starElement);
  }

  if (halfStar) {
    const starElement = document.createElement('span');
    starElement.innerHTML = '&#9733;'; 
    starElement.classList.add('half-star');
    starsContainer.appendChild(starElement);
  }

  for (let i = 0; i < emptyStars; i++) {
    const starElement = document.createElement('span');
    starElement.innerHTML = '&#9734;'; 
    starElement.classList.add('empty-star');
    starsContainer.appendChild(starElement);
  }

  return starsContainer.outerHTML;
};

// Funkcja wyciągania filmu dnia

const renderMovieHero = async () => {
  try {
    const data = await getTrending();
    const movies = data.results;

    if (movies.length === 0) {
      heroElement.innerHTML = defaultHeroContent;
      document.getElementById('get-started').addEventListener('click', () => {
        window.location.href = '/catalog';
      });
      return;
    }

    const movie = movies[Math.floor(Math.random() * movies.length)];
    heroElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

    // Zamiana numerycznego ratingu na gwiazdki
    heroElement.innerHTML = `
      <div class="movie-info">
        <h2>${movie.title}</h2>
        <p>Rating: ${displayStarRating(movie.vote_average)}</p>
        <p>${movie.overview}</p>
        <button id="watch-trailer">Watch Trailer</button>
        <button id="more-details">More Details</button>
      </div>
    `;

    document.getElementById('watch-trailer').addEventListener('click', async () => {
      const trailerData = await getTrailer(movie.id);
      openTrailerModal(trailerData);
    });

    document.getElementById('more-details').addEventListener('click', async () => {
      const details = await getDetails(movie.id);
      openDetailsModal(details);
    });

  } catch (error) {
    console.error('Error fetching trending movies:', error);
    heroElement.innerHTML = defaultHeroContent;
  }
};

renderMovieHero();
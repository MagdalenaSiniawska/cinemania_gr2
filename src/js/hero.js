import { getTrending, getDetails, getTrailer } from './API.js';
import { openDetailsModal, openTrailerModal } from './hero_modals.js';

const heroElement = document.querySelector('.hero');
const defaultHeroContent = `
  <div class="hero-content">
    <h1 class="hero-header">Let’s Make Your Own Cinema</h1>
    <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button id="get-started">Get Started</button>
  </div>
`;

// Funkcja pomocnicza tworzenia elementu gwiazdki
const createStarElement = type => {
  const starElement = document.createElement('span');
  starElement.classList.add(`${type}-star`);

  starElement.innerHTML = '&#9733;';

  if (type === 'empty') {
    starElement.innerHTML = '&#9734;';
  }

  return starElement;
};

// Wyświetlanie gwiazdek jako rating
export const displayStarRating = rating => {
  const starsContainer = document.createElement('div');
  starsContainer.classList.add('star-rating');

  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1 ? 1 : 0;
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
    heroElement.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

    // Zamiana numerycznego ratingu na gwiazdki
    heroElement.innerHTML = `
      <div class="movie-info">
        <h2 class="hero-hader">${movie.title}</h2>
        <p class="star-rating">${displayStarRating(movie.vote_average)}</p>
        <p class="hero-description">${movie.overview}</p>
        <button id="watch-trailer">Watch Trailer</button>
        <button id="more-details">More Details</button>
      </div>
    `;

    document
      .getElementById('watch-trailer')
      .addEventListener('click', async () => {
        const trailerData = await getTrailer(movie.id);
        openTrailerModal(trailerData);
      });

    document
      .getElementById('more-details')
      .addEventListener('click', async () => {
        const details = await getDetails(movie.id);
        openDetailsModal(details);
      });
  } catch (error) {
    console.error('Error fetching trending movies:', error);

    const desktopImage = '../images/hero-desktop.jpg';
    const tabletImage = '../images/hero-tablet.jpg';
    const mobileImage = '../images/hero-mobile.jpg';

    // Sprawdzenie rozmiaru okna
    if (window.innerWidth >= 1024) {
      heroElement.style.backgroundImage = `url(${desktopImage})`;
    } else if (window.innerWidth >= 768) {
      heroElement.style.backgroundImage = `url(${tabletImage})`;
    } else {
      heroElement.style.backgroundImage = `url(${mobileImage})`;
    }

    heroElement.innerHTML = defaultHeroContent;
  }
};

renderMovieHero();

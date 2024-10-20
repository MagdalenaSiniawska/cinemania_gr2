// Modal dla zwiastuna filmu 
export const openTrailerModal = (trailerData) => {
  const modalTrailer = document.getElementById('modal-trailer');
  const trailer = trailerData.results.find(vid => vid.type === 'Trailer');

  if (trailer) {
    modalTrailer.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" 
          frameborder="0" allowfullscreen></iframe>
      </div>
    `;
  } else {
    modalTrailer.innerHTML = `
      <div class="modal-content error-pop-up">
        <span class="close-modal">&times;</span>
        <img src="../images/oops-logo.png" alt="camera icon with popcorn" width="363" height="318"/>
        <p>OOPS... We are very sorry! But we couldn’t find the trailer.</p>
      </div>
    `;
  }

  modalTrailer.style.display = 'block';

  // Zamknięcie modala dla zwiastuna filmu przez ikonę zamknięcia
  modalTrailer.querySelector('.close-modal').addEventListener('click', () => {
    modalTrailer.style.display = 'none';
  });

  // Zamknięcie modala przez kliknięcie w tło modala
  modalTrailer.addEventListener('click', (event) => {
    if (event.target === modalTrailer) {
      modalTrailer.style.display = 'none';
    }
  });
};

// Modal dla szczegółów filmu
export const openDetailsModal = (details) => {
  const modalDetails = document.getElementById('modal-details');

  console.log('Modal element:', modalDetails); // Dodaj ten log
  console.log('Modal is visible:', modalDetails.style.display); // Dodaj ten log

  if (!modalDetails) {
    console.error('Modal element not found!');
    return;
  }

  const voteAverage = details.vote_average.toFixed(2);
  const voteCount = details.vote_count.toFixed(2);
  const popularity = details.popularity.toFixed(2);

  const backgroundImage = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${details.backdrop_path}`
    : `https://image.tmdb.org/t/p/original/${details.poster_path}`;

  modalDetails.innerHTML = `
    <div class="modal-content" style="background-image: url('${backgroundImage}'); background-size: cover; background-position: center; padding: 20px; color: white;">
      <span class="close-modal" style="cursor: pointer; font-size: 24px;">&times;</span>
      <h2>${details.title}</h2>
      <p><strong>Vote / Votes:</strong> ${voteAverage} / ${voteCount}</p>
      <p><strong>Popularity:</strong> ${popularity}</p>
      <p><strong>Genres:</strong> ${details.genres.map(genre => genre.name).join(', ')}</p>
      <p><strong>Overview:</strong> ${details.overview}</p>
      <button id="add-to-library" class="add-to-library-btn">Add to my library</button>
    </div>
  `;
  modalDetails.style.display = 'block';
  console.log('Modal should now be displayed:', modalDetails.style.display);

   // Ustaw modal na widoczny
  modalDetails.classList.add('show'); 
  console.log('Modal should be shown');
  
  // Zamknięcie modala dla szczegółów filmu przez ikonę zamknięcia
  modalDetails.querySelector('.close-modal').addEventListener('click', () => {
  console.log('Close modal clicked'); // Dodaj ten log
  modalDetails.style.display = 'none';
});

  // Zamknięcie modala przez kliknięcie w tło modala
  modalDetails.addEventListener('click', (event) => {
    if (event.target === modalDetails) {
      modalDetails.style.display = 'none';
    }
  });

  // Dodanie filmu do biblioteki po kliknięciu w przycisk "Add to my library"
  document.querySelector('.modal-content').addEventListener('click', event => {
    if (event.target && event.target.id === 'add-to-library') {
      const movieToAdd = {
        title: details.title,
        vote_average: details.vote_average,
        vote_count: details.vote_count,
        popularity: details.popularity,
        genres: details.genres.map(genre => genre.name),
        overview: details.overview,
        year: new Date(details.release_date).getFullYear(),
        poster: `https://image.tmdb.org/t/p/w500${details.poster_path}`
      };

      // Sprawdź, czy film jest już w bibliotece
      const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
      const movieExists = myLibrary.some(item => item.title === movieToAdd.title);

      if (!movieExists) {
        addMovieToLibrary(movieToAdd);
        event.target.textContent = 'Remove from my library'; // Zmień tekst przycisku
      } else {
        removeMovieFromLibrary(movieToAdd.title);
        event.target.textContent = 'Add to my library'; // Zmień tekst przycisku
      }
    }
  });

  // Funkcja dodawania filmu do localStorage
  function addMovieToLibrary(movie) {
    const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
    myLibrary.push(movie);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    alert(`${movie.title} has been added to your library!`);
  }

  // Funkcja usuwania filmu z localStorage
  function removeMovieFromLibrary(movieTitle) {
    let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
    myLibrary = myLibrary.filter(movie => movie.title !== movieTitle);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    alert(`${movieTitle} has been removed from your library!`);
  }

  // Inicjalizacja przycisku na podstawie obecności filmu w localStorage
  function initializeLibraryButton(details) {
    const addToLibraryButton = document.getElementById('add-to-library');
    const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
    const movieExists = myLibrary.some(movie => movie.title === details.title);

    if (movieExists) {
      addToLibraryButton.textContent = 'Remove from My Library';
    } else {
      addToLibraryButton.textContent = 'Add to my Library';
    }
  }

  initializeLibraryButton(details)
}


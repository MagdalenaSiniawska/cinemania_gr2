// Modal dla zwiastuna filmu
export const openTrailerModal = (trailerData) => {
  console.log('Trying to open trailer modal with data:', trailerData);
  const modalTrailer = document.getElementById('modal-trailer');

  // Sprawdzamy, czy istnieje modal
  if (!modalTrailer) {
    console.error("Modal element not found!");
    return;
  }

  // Logujemy trailerData, aby sprawdzić, czy zawiera poprawne dane
  console.log('Trailer data:', trailerData);

  // Znalezienie zwiastuna w wynikach
  const trailer = trailerData.results.find(vid => vid.type === 'Trailer');
  if (trailer) {
    // Jeżeli zwiastun znaleziony, wstaw iframe do modala
    modalTrailer.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" 
          frameborder="0" allowfullscreen></iframe>
      </div>
    `;
    console.log('Trailer found, iframe set:', `https://www.youtube.com/embed/${trailer.key}`);
  } else {
    // Jeśli brak zwiastuna, pokazujemy komunikat o błędzie
    modalTrailer.innerHTML = `
      <div class="modal-content error-pop-up">
        <span class="close-modal">&times;</span>
        <img src="../images/oops-logo.png" alt="camera icon with popcorn" width="363" height="318"/>
        <p>OOPS... We are very sorry! But we couldn’t find the trailer.</p>
      </div>
    `;
    console.warn('No trailer found.');
  }

  modalTrailer.style.display = 'block';
  console.log('Modal style after setting to block:', window.getComputedStyle(modalTrailer).display);

  // Zamknięcie modala przez kliknięcie w ikonę zamknięcia
  modalTrailer.querySelector('.close-modal').addEventListener('click', (event) => {
    event.stopPropagation();
    modalTrailer.style.display = 'none';
    console.log('Modal closed via close button.');
  });

  // Zabezpieczenie przed przypadkowym zamknięciem przez kliknięcie w zawartość modala
  modalTrailer.querySelector('.modal-content').addEventListener('click', (event) => {
    event.stopPropagation(); 
  });

  // Zamknięcie modala przez kliknięcie w tło (ale nie w modal-content)
  modalTrailer.addEventListener('click', (event) => {
    if (event.target === modalTrailer) {
      modalTrailer.style.display = 'none';
      console.log('Modal closed by clicking outside modal-content.');
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
  const addToLibraryButton = document.getElementById('add-to-library');
  addToLibraryButton.addEventListener('click', (event) => {
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
      addToLibraryButton.textContent = 'Remove from my library'; // Zmień tekst przycisku
    } else {
      removeMovieFromLibrary(movieToAdd.title);
      addToLibraryButton.textContent = 'Add to my library'; // Zmień tekst przycisku
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
  function initializeLibraryButton(details) {
    const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
    const movieExists = myLibrary.some(movie => movie.title === details.title);

    if (movieExists) {
      addToLibraryButton.textContent = 'Remove from My Library';
    } else {
      addToLibraryButton.textContent = 'Add to my Library';
    }
  }

  initializeLibraryButton(details);
};
// Modal dla zwiastuna filmu
export const openTrailerModal = trailerData => {
  const modalTrailer = document.getElementById('modal-trailer');
  const trailer = trailerData.results.find(vid => vid.type === 'Trailer');
  const trailerBtn = document.querySelector('#watch-trailer');

  trailerBtn.addEventListener('click', () => {
    modalTrailer.style.display.block;
  });
  if (trailer) {
    modalTrailer.innerHTML = `          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}"
              frameborder="0" allowfullscreen></iframe>
          </div>
        `;
  } else {
    modalTrailer.innerHTML = `<div class="modal-content error-pop-up">
            <span class="close-modal">&times;</span>
              <p>OOPS... </br>We are very sorry! </br>But we couldn’t find the trailer.</p>
               <img src="../images/oops-logo.png" alt="camera icon with popcorn" width="363" height="318"/>
          </div>
        `;
  }

  modalTrailer.style.display = 'block';
  // Zamknięcie modala dla zwiastuna filmu przez ikonę zamknięcia
  modalTrailer.querySelector('.close-modal').addEventListener('click', () => {
    modalTrailer.style.display = 'none';
    modalTrailer.innerHTML = '';
  });

  // Zamknięcie modala przez kliknięcie w tło modala
  modalTrailer.addEventListener('click', event => {
    if (event.target === modalTrailer) {
      modalTrailer.style.display = 'none';
      modalTrailer.innerHTML = '';
    }
  });
};

// Modal dla szczegółów filmu

export const openDetailsModal = details => {
  const modalDetails = document.getElementById('modal-details');

  const backgroundImage = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${details.backdrop_path}`
    : `https://image.tmdb.org/t/p/original/${details.poster_path}`;

  modalDetails.innerHTML = ` <div class="modal-content">
      <span class="close-modal">&times;</span> <!-- Przeniesiono przycisk zamykania tutaj -->
      <div class="modal-image" style="background-image: url('${backgroundImage}');"></div>
      <div class="modal-text">
        <h3 class="modal-title">${details.title}</h3>
        <div class="tags-grade-wrap">
        <div>
        <p><strong>Vote / Votes:</strong></p>
        <p><strong>Popularity:</strong></p>
        <p><strong>Genres:</strong></p>
</div><div>
<p> ${details.vote_average} / ${details.vote_count}</p>        
<p> ${details.popularity.toFixed(1)}</p>          
<p> ${details.genres.map(genre => genre.name).join(', ')}</p>
    </div></div>
    <div class="modal-text-about">
        <p ><strong>ABOUT:</strong></p>
        <p class="modal-text-about">${details.overview}</p>
    </div>
        <button id="add-to-library" class="add-to-library-btn">Add to my library</button>
      </div>
    </div>
  `;

  modalDetails.style.display = 'block';

  // Zamknięcie modala dla szczegółów filmu przez ikonę zamknięciamodalDetails.querySelector('.close-modal').addEventListener('click', () => {
  modalDetails.querySelector('.close-modal').addEventListener('click', () => {
    modalDetails.style.display = 'none';
  });

  // Zamknięcie modala przez kliknięcie w tło modala
  modalDetails.addEventListener('click', event => {
    if (event.target === modalDetails) {
      modalDetails.style.display = 'none';
    }
  });
  // Dodanie filmu do biblioteki po kliknięciu w przycisk "Add to my library"
  const addToLibraryButton = document.getElementById('add-to-library');
  addToLibraryButton.addEventListener('click', event => {
    const movieToAdd = {
      title: details.title,
      vote_average: details.vote_average,
      vote_count: details.vote_count,
      popularity: details.popularity,
      genres: details.genres.map(genre => genre.name),
      overview: details.overview,
      year: new Date(details.release_date).getFullYear(),
      poster: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
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

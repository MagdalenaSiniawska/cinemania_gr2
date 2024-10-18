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

  const backgroundImage = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${details.backdrop_path}`
    : `https://image.tmdb.org/t/p/original/${details.poster_path}`;

  modalDetails.innerHTML = `
    <div class="modal-content" style="background-image: url('${backgroundImage}'); background-size: cover; background-position: center; padding: 20px; color: white;">
      <span class="close-modal" style="cursor: pointer; font-size: 24px;">&times;</span>
      <h2>${details.title}</h2>
      <p><strong>Vote / Votes:</strong> ${details.vote_average} / ${details.vote_count}</p>
      <p><strong>Popularity:</strong> ${details.popularity}</p>
      <p><strong>Genres:</strong> ${details.genres.map(genre => genre.name).join(', ')}</p>
      <p><strong>Overview:</strong> ${details.overview}</p>
      <button id="add-to-library" class="add-to-library-btn">Add to my library</button>
    </div>
  `;
  modalDetails.style.display = 'block';

  // Zamknięcie modala dla szczegółów filmu przez ikonę zamknięcia
  modalDetails.querySelector('.close-modal').addEventListener('click', () => {
    modalDetails.style.display = 'none';
  });

  // Zamknięcie modala przez kliknięcie w tło modala
  modalDetails.addEventListener('click', (event) => {
    if (event.target === modalDetails) {
      modalDetails.style.display = 'none';
    }
  });
};
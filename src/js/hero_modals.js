// Modal dla zwiastuna filmu
export const openTrailerModal = trailerData => {
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
              <p>OOPS... </br>We are very sorry! </br>But we couldn’t find the trailer.</p>
               <img src="../images/oops-logo.png" alt="camera icon with popcorn" width="363" height="318"/>

          </div>
        `;
  }

  modalTrailer.style.display = 'block';

  // Zamknięcie modala dla zwiastuna filmu przez ikonę zamknięcia
  modalTrailer.querySelector('.close-modal').addEventListener('click', () => {
    modalTrailer.style.display = 'none';
  });

  // Zamknięcie modala przez kliknięcie w tło modala
  modalTrailer.addEventListener('click', event => {
    if (event.target === modalTrailer) {
      modalTrailer.style.display = 'none';
    }
  });
};

// Modal dla szczegółów filmu

export const openDetailsModal = details => {
  const modalDetails = document.getElementById('modal-details');

  const backgroundImage = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${details.backdrop_path}`
    : `https://image.tmdb.org/t/p/original/${details.poster_path}`;

  modalDetails.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span> <!-- Przeniesiono przycisk zamykania tutaj -->
      <div class="modal-image" style="background-image: url('${backgroundImage}');"></div>
      <div class="modal-text">
        <h2>${details.title}</h2>
        <div class="tags-grade-wrap">
        <div>
        <p><strong>Vote / Votes:</strong></p>
        <p><strong>Popularity:</strong></p>
        <p><strong>Genres:</strong></p>
</div><div>

<p> ${details.vote_average} / ${details.vote_count}</p>        
<p> ${details.popularity}</p>          
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

  // Zamknięcie modala dla szczegółów filmu przez ikonę zamknięcia
  modalDetails.querySelector('.close-modal').addEventListener('click', () => {
    modalDetails.style.display = 'none';
  });

  // Zamknięcie modala przez kliknięcie w tło modala
  modalDetails.addEventListener('click', event => {
    if (event.target === modalDetails) {
      modalDetails.style.display = 'none';
    }
  });
};

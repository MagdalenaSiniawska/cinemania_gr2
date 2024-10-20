document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#searchForm');
    const catalog = document.querySelector('#catalog');
    const genreSelect = document.querySelector('#genre-select');
    const loadMoreBtn = document.querySelector('#load-more');

    let displayedMovies = 0;
    const moviesPerPage = 6;
    let allMovies = [];

    // Funkcja pomocnicza tworzenia elementu gwiazdki
    const createStarElement = (type) => {
        const starElement = document.createElement('span');
        starElement.classList.add(`${type}-star`);
        
        starElement.innerHTML = '&#9733;'; // Pełna gwiazdka

        if (type === 'empty') {
            starElement.innerHTML = '&#9734;'; // Pusta gwiazdka
        }

        return starElement;
    };

    // Wyświetlanie gwiazdek jako rating
    const displayStarRating = (rating) => {
        console.log(`Rating dla filmu: ${rating}`);

        const starsContainer = document.createElement('div');
        starsContainer.classList.add('star-rating');

        // Przekształcenie z skali 0-10 do 0-5
        const normalizedRating = rating / 2;

        const fullStars = Math.floor(normalizedRating);
        const halfStar = (normalizedRating % 1) >= 0.5 ? 1 : 0;
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

    // Funkcja do renderowania elementów
    const renderElements = (films, rootList) => {
        const fragment = document.createDocumentFragment();

        films.forEach(film => {
            const filmElement = document.createElement('div');
            filmElement.classList.add('film-card');

            // Użyj vote_average jako ratingu
            const rating = film.vote_average;

            filmElement.innerHTML = `
                <img src="${film.poster || ''}" alt="${film.title || ''} poster" class="film-poster"/>
                <h3>${film.title || ''}</h3>
                <p>Genre: ${Array.isArray(film.genres) && film.genres.length > 0 ? film.genres.join(', ') : 'N/A'}</p>
                <p>Year: ${film.year || ''}</p>
                <p>${displayStarRating(rating) || ''}</p> <!-- Użyj vote_average jako rating -->
            `;
            fragment.appendChild(filmElement);
        });

        rootList.append(fragment);
        console.log('Appended elements to catalog:', rootList);
    };

    // Fetch dla filmów zapisanych w localStorage
    const getMoviesFromLibrary = () => {
        const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
        console.log('Movies from localStorage:', myLibrary);
        return Array.isArray(myLibrary) ? myLibrary : [];
    };

    // Pobranie i wyświetlenie filmów z localStorage
    const loadSavedMovies = () => {
        allMovies = getMoviesFromLibrary();
        console.log('Loaded movies from library:', allMovies);
        catalog.innerHTML = '';

        if (!Array.isArray(allMovies) || allMovies.length === 0) {
            console.warn('No movies found in library or library is not an array.');
            return;
        }

        renderElements(allMovies.slice(0, moviesPerPage), catalog);
        displayedMovies = Math.min(moviesPerPage, allMovies.length);

        loadMoreBtn.style.display = displayedMovies >= allMovies.length ? 'none' : 'block';
    };

    // Funkcjonalność Load More
    loadMoreBtn.addEventListener('click', () => {
        const moreMovies = allMovies.slice(displayedMovies, displayedMovies + moviesPerPage);
        renderElements(moreMovies, catalog);
        displayedMovies += moreMovies.length;

        loadMoreBtn.style.display = displayedMovies >= allMovies.length ? 'none' : 'block';
    });

    // Funkcjonalność Search dla zapisanych filmów
    form.addEventListener('submit', e => {
        e.preventDefault();
        const searchQuery = document.querySelector('#searchInput').value.toLowerCase();
        if (searchQuery) {
            const filteredMovies = allMovies.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery)
            );
            catalog.innerHTML = '';
            renderElements(filteredMovies.slice(0, moviesPerPage), catalog);
            displayedMovies = Math.min(moviesPerPage, filteredMovies.length);

            loadMoreBtn.style.display = displayedMovies >= filteredMovies.length ? 'none' : 'block';
        }
    });

    // Filtrowanie po kategorii wśród zapisanych filmów
    genreSelect.addEventListener('change', e => {
        const selectedGenre = e.target.value;
        let filteredMovies;

        if (selectedGenre === 'all') {
            filteredMovies = allMovies;
        } else {
            filteredMovies = allMovies.filter(movie =>
                movie.genres.includes(selectedGenre)
            );
        }

        catalog.innerHTML = '';
        renderElements(filteredMovies.slice(0, moviesPerPage), catalog);
        displayedMovies = Math.min(moviesPerPage, filteredMovies.length);

        loadMoreBtn.style.display = displayedMovies >= filteredMovies.length ? 'none' : 'block';
    });

    // Ładowanie zapisanych filmów po załadowaniu strony
    loadSavedMovies();
});
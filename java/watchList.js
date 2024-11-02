/**
 * This script handles localStorage and Watch List operations for the movie streaming application.
 * It provides utility functions to create, read, add to, and remove from the watch list stored in localStorage.
 */

/**
 * Adds a movie object to the Watch List stored in localStorage.
 * @param {object} movie - The movie object to add.
 */
export function addToWatchList(movie) {
    let watchList = localStorage.getItem("watchList");
    watchList = watchList ? JSON.parse(watchList) : [];
    if (!watchList.some(watchItem => watchItem.id === movie)) {
        watchList.push(movie);
        localStorage.setItem("watchList", JSON.stringify(watchList));
        // renderWatchList();
    } else {
        console.log("Movie already in watchlist:", movie.title);
    }
}

/**
 * Removes a movie ID from the Watch List stored in localStorage.
 * @param {number} movieId - The ID of the movie to remove.
 */
export function removeFromWatchList(movieId) {
    let watchList = localStorage.getItem("watchList");
    if (watchList) {
        watchList = JSON.parse(watchList);
        const updatedWatchList = watchList.filter(watchItem => watchItem.id !== movieId);
        localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
        // renderWatchList();
    }
}

/**
 * Checks if a movie ID is already in the Watch List stored in localStorage.
 * @param {number} movieId - The ID of the movie to check.
 * @returns {boolean} - True if the movie is in the Watch List, false otherwise.
 */
export function isInWatchList(movieId) {
    let watchList = localStorage.getItem("watchList");
    if (watchList) {
        watchList = JSON.parse(watchList);
        return watchList.some(watchItem => watchItem.id === movieId);
    }
    return false;
}

/**
 * Retrieves all movie objects from the Watch List stored in localStorage.
 * @returns {object[]} - An array of movie objects from the Watch List.
 */
export function getWatchList() {
    let watchList = localStorage.getItem("watchList");
    return watchList ? JSON.parse(watchList) : [];
}

// Attach event listeners for adding to watchlist
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('watch-later') || event.target.classList.contains('watch-later')) {
        const movieCard = event.target.closest('.card');
        if (!movieCard) {
            console.error("No .card element found for the clicked element:", event.target);
            return;
        }

        const movie = {
            id: parseInt(movieCard.dataset.id, 10),
            title: movieCard.querySelector('.card-title') ? movieCard.querySelector('.card-title').textContent : 'Untitled',
            rating: movieCard.querySelector('.movie-rating') ? parseFloat(movieCard.querySelector('.movie-rating').textContent.split(' ')[1]) : 0,
            release_date: movieCard.querySelector('.movie-year') ? movieCard.querySelector('.movie-year').textContent : 'N/A',
            poster: movieCard.querySelector('img') ? movieCard.querySelector('img').src : ''
        };

        console.log("Movie data extracted:", movie);

        if (event.target.textContent === '+ Watch List') {
            addToWatchList(movie);
            event.target.textContent = 'Remove';
            event.target.onclick = () => removeFromWatchList(movie.id);
        } else if (event.target.textContent === 'Remove') {
            removeFromWatchList(movie.id);
        }
    }
});

// Render watchlist
export function renderWatchList() {
    let watchList = getWatchList();
    console.log("Rendering watchlist"); // Debugging

    // Log all movie IDs in the watchList
    const allMovieIds = watchList.map(movie => movie.id);
    console.log("All movie IDs in watchlist:", allMovieIds);

    const watchListContainer = document.getElementById('watchListContainer');
    watchListContainer.innerHTML = '';

    if (watchList.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "Your watchlist is currently empty.";
        emptyMessage.classList.add('empty-message');
        watchListContainer.appendChild(emptyMessage);
        return;
    }

    watchList.forEach(movie => {
        const movieCard = createMovieCard(movie);
        const watchListButton = movieCard.querySelector('.movie-btn');
        watchListButton.textContent = 'Remove'; // Change button text to 'Remove'
        watchListButton.onclick = () => removeFromWatchList(movie.id);
        watchListContainer.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.id = movie.id;

    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title} Poster" class="movie-poster">
        <h3 class="card-title">${movie.title}</h3>
        <p class="movie-rating">Rating: ${movie.rating}</p>
        <p class="movie-year">Released: ${movie.release_date}</p>
        <button class="movie-btn">Remove</button> <!-- Default button for remove -->
    `;

    return card;
}

// Initial render
// renderWatchList();

window.addToWatchList = addToWatchList;
window.removeFromWatchList = removeFromWatchList;
window.isInWatchList = isInWatchList;
window.getWatchList = getWatchList;
window.renderWatchList = renderWatchList;
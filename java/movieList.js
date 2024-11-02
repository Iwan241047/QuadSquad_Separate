/**
    The home.js file provides JavaScript functionality to be used for the Home.html page of a movie streaming application. 
    It includes several functions that interact with the Movie API to load movie data dynamically and update the UI.
    Specifically, it creates carousel items and movie cards based on categories like 'Popular', 'In Theatres', 'Top Rated', and 'Upcoming'. 
    The script handles category switching, toggling play/pause functionality for the carousel, and ensures the movie cards are displayed in rows for each selected category.
 */


// Easier for Visual Studio's IntelliSense to work with:
/**
 * @typedef {Object} MovieDetails
 * @property {number} id - The movie ID.
 * @property {string} title - The title of the movie.
 * @property {string} director - The name of the movie's director.
 * @property {string} cast - Comma-separated names of up to 5 main cast members.
 * @property {string} overview - A brief overview of the movie's plot.
 * @property {number} rating - Average rating of the movie.
 * @property {string} poster - URL to the movie poster image.
 * @property {string} trailer - URL to the YouTube trailer, if available.
 * @property {string} release_date - The release date of the movie, formatted as 'YYYY-MM-DD'.
 */


/**
 * Controls the state of the carousel, either playing or paused.
 */
let isPlaying = true;

const carouselElement = document.querySelector('#mainCarousel');
const toggleButton = document.querySelector('#toggleCarousel');
const toggleIcon = document.querySelector('#toggleIcon');
const carouselInstance = new bootstrap.Carousel(carouselElement);

/**
 * Toggles between play and pause states of the carousel.
 */
const togglePlayPause = () => {
    if (isPlaying) {
        carouselInstance.pause();
        toggleIcon.src = '../assets/PlayButton.svg';
    } else {
        carouselInstance.cycle();
        toggleIcon.src = '../assets/PauseButton.svg';
    }
    isPlaying = !isPlaying;
};

// If it is playing, then pause, otherwise play.
toggleButton.addEventListener('click', togglePlayPause);

/**
 * Loads the top three premiere movies into the carousel.
 * @returns {Promise<void>}
 */
async function loadTopRatedMovies() {
    const premiereMovies = await window.fetchPremiereMovies();
    const topThreeMovies = premiereMovies.slice(0, 3);
    const carouselIndicators = document.querySelector('.carousel-indicators');
    const carouselInner = document.querySelector('.carousel-inner');

    topThreeMovies.forEach((movie, index) => {
        const newCarouselItem = createCarouselItem(movie, index === 0);
        carouselInner.appendChild(newCarouselItem);
        
        // Create corresponding indicator button
        const indicatorButton = document.createElement('button');
        indicatorButton.type = 'button';
        indicatorButton.setAttribute('data-bs-target', '#mainCarousel');
        indicatorButton.setAttribute('data-bs-slide-to', index);
        indicatorButton.className = index === 0 ? 'active' : '';
        indicatorButton.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === 0) {
            indicatorButton.setAttribute('aria-current', 'true');
        }
        carouselIndicators.appendChild(indicatorButton);
    });
}

loadTopRatedMovies();

/**
 * Creates a carousel item element.
 * @param {MovieDetails} movie - The movie object containing movie details.
 * @param {boolean} isActive - Whether this item is the active item in the carousel.
 * @returns {HTMLElement} The carousel item element.
 */
function createCarouselItem(movie, isActive) {
    /**
     * Helper function to create a div with a class and text content.
     * @param {string} className - The class name for the div.
     * @param {string} textContent - The text content for the div.
     * @returns {HTMLElement} The created div element.
     */
    function createDiv(className, textContent) {
        const div = document.createElement('div');
        div.className = className;
        div.textContent = textContent;
        return div;
    }

    /**
     * Creates the item container with movie details.
     * @param {MovieDetails} movie - The movie object containing movie details.
     * @returns {HTMLElement} The item container element.
     */
    function createItemContainer(movie) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'item-container';

        // Create and append the movie details
        const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
        itemContainer.appendChild(createDiv('movie-duration', releaseYear));
        itemContainer.appendChild(createDiv('movie-rating', movie.rating));
        itemContainer.appendChild(createDiv('movie-title', movie.title));
        itemContainer.appendChild(createDiv('movie-description', movie.overview));

        // Create the movie button group div
        const movieButtonGroup = document.createElement('div');
        movieButtonGroup.className = 'movie-button-group';

        // Create the "Watch Now" button
        const watchNowButton = document.createElement('button');
        watchNowButton.className = 'watch-now';
        watchNowButton.textContent = 'Watch Now';

        // Create the "+ Watch List" button
        const watchLaterButton = document.createElement('button');
        watchLaterButton.className = 'watch-later';
        watchLaterButton.textContent = '+ Watch List';

        // Append buttons to the button group
        movieButtonGroup.appendChild(watchNowButton);
        movieButtonGroup.appendChild(watchLaterButton);

        // Append the button group to the item container
        itemContainer.appendChild(movieButtonGroup);

        return itemContainer;
    }

    // Create the carousel item div
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item' + (isActive ? ' active' : '');
    carouselItem.style.backgroundImage = `url(${movie.poster})`;
    carouselItem.style.backgroundSize = 'cover';
    carouselItem.style.backgroundPosition = 'center';

    // Create the item container and append it to the carousel item
    const itemContainer = createItemContainer(movie);
    carouselItem.appendChild(itemContainer);

    return carouselItem;
}

/**
 * Creates a movie card element for displaying in the grid.
 * @param {MovieDetails} movie - The movie object containing movie details.
 * @returns {HTMLElement} The movie card element.
 */
function createMovieCard(movie, showFullDate = false) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-3';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    const img = document.createElement('img');
    img.src = movie.poster;
    img.className = 'card-img-top';
    img.alt = 'Card image';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = movie.title;

    // create the details for the bottom of the card
    const cardDetails = document.createElement('div');
    cardDetails.className = 'd-flex justify-content-between mt-2';

    const movieYear = document.createElement('span');

    // If we want to see the full date, then show it.
    if(showFullDate) {
        movieYear.textContent = movie.release_date;
        
        // Check if the release_date is present
    } else if (movie.release_date) {
        movieYear.textContent = new Date(movie.release_date).getFullYear();
    } else {
        movieYear.textContent = 'N/A';
    }

    const movieRating = document.createElement('span');
    // round rating to 1 decimal
    movieRating.textContent = 'Rating: ' + Math.round(movie.rating * 10) / 10;
    
    cardDetails.appendChild(movieYear);
    cardDetails.appendChild(movieRating);

    const cardLink = document.createElement('button');
    cardLink.href = '#';
    cardLink.className = 'movie-btn';
    cardLink.textContent = '+ Watch list';

    // Append all elements to card body and card div
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardLink);
    cardBody.appendChild(cardDetails);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);

    return colDiv;
}


/**
 *  * Loads movies based on the selected category and displays them as cards. 
 * @param {string} category - The category of movies to load (e.g., 'popular', 'inTheatres').
 * @returns {void}
 */
function toggleCategory(category) {
    const trendButtons = document.querySelectorAll('.trend-button');
    trendButtons.forEach(button => button.classList.remove('active'));

    const buttonId = category + 'Button';
    document.getElementById(buttonId).classList.add('active');

    const movieCardsRow = document.getElementById('movieCardsRow');
    movieCardsRow.innerHTML = ''; // Clear previous cards

    switch (category) {
        case 'popular':
            window.fetchPopularMovies().then(movies => addMoviesToRow('Popular', movies));
            break;
        case 'inTheatres':
            window.fetchPremiereMovies().then(movies => addMoviesToRow('In Theatres', movies));
            break;
        case 'topRated':
            window.fetchTopRatedMovies().then(movies => addMoviesToRow('Top Rated', movies));
            break;
        case 'upcoming':
            window.fetchUpcomingMovies().then(movies => addMoviesToRow('Upcoming', movies));
            break;
        default:
            window.fetchPopularMovies().then(movies => addMoviesToRow('Popular', movies));
            window.fetchPremiereMovies().then(movies => addMoviesToRow('In Theatres', movies));
            window.fetchTopRatedMovies().then(movies => addMoviesToRow('Top Rated', movies));
            window.fetchUpcomingMovies().then(movies => addMoviesToRow('Upcoming', movies));
            break;
    }
}


/**
 * Loads movies based on the selected category and displays them as cards. 
 * @param {string} title - The title to show for the row.
 * @param {MovieDetails[]} movies - The Movie array containing movie objects and its details.
 * @returns {void}
 */
function addMoviesToRow(title, movies) {
    // Create a title element
    const titleElement = document.createElement('h3');
    titleElement.className = 'category-title pb-4 mb-4';
    titleElement.textContent = title;

    // Create a new row for the movies
    const newMovieCardsRow = document.createElement('div');
    newMovieCardsRow.className = 'row movie-cards-row list-container';

    // Populate the new row with the movies.
    movies.slice(0, 4).forEach(movie => {
        const newMovieCard = createMovieCard(movie, title === 'Upcoming');
        newMovieCardsRow.appendChild(newMovieCard);
    });

    // Get the container and add the title and the movie row
    const mainContainer = document.getElementById('movieCardsRow');
    mainContainer.appendChild(titleElement);
    mainContainer.appendChild(newMovieCardsRow);
}

window.toggleCategory('all');
window.toggleCategory = toggleCategory;




/* Genre Filter*/

function toggleGenre(genre) {
    const genreItems = document.querySelectorAll('.dropdown-item');
    genreItems.forEach(item => item.classList.remove('active')); // Optional: If you want to indicate the active genre

    // const itemId = genre + 'Item';
    // document.getElementById(itemId).classList.add('active');

    const genreCardRow = document.getElementById('movieCardsRow');
    genreCardRow.innerHTML = ''; // Clear previous cards

    switch (genre) {
        case 'Action':
            window.fetchActionMovies().then(movies => addMoviesToRow('Action', movies));
            break;
        case 'Animation':
            window.fetchAnimationMovies().then(movies => addMoviesToRow('Animation', movies));
            break;
        case 'Biography':
            window.fetchBiographyMovies().then(movies => addMoviesToRow('Biography', movies));
            break;
        case 'Crime':
            window.fetchCrimeMovies().then(movies => addMoviesToRow('Crime', movies));
            break;
        case 'Documentary':
            window.fetchDocumentaryMovies().then(movies => addMoviesToRow('Documentary', movies));
            break;
        case 'Drama':
            window.fetchDramaMovies().then(movies => addMoviesToRow('Drama', movies));
            break;
        case 'Fantasy':
            window.fetchFantasyMovies().then(movies => addMoviesToRow('Fantasy', movies));
            break;
        case 'Horror':
            window.fetchHorrorMovies().then(movies => addMoviesToRow('Horror', movies));
            break;
        case 'Sci-Fi':
            window.fetchSciFiMovies().then(movies => addMoviesToRow('Sci-Fi', movies));
            break;
        case 'Thriller':
            window.fetchThrillerMovies().then(movies => addMoviesToRow('Thriller', movies));
            break;
        default:
            window.fetchActionMovies().then(movies => addMoviesToRow('Action', movies));
            window.fetchAnimationMovies().then(movies => addMoviesToRow('Animation', movies));
            window.fetchBiographyMovies().then(movies => addMoviesToRow('Biography', movies));
            window.fetchCrimeMovies().then(movies => addMoviesToRow('Crime', movies));
            window.fetchDocumentaryMovies().then(movies => addMoviesToRow('Documentary', movies));
            window.fetchDramaMovies().then(movies => addMoviesToRow('Drama', movies));
            window.fetchFantasyMovies().then(movies => addMoviesToRow('Fantasy', movies));
            window.fetchHorrorMovies().then(movies => addMoviesToRow('Horror', movies));
            window.fetchSciFiMovies().then(movies => addMoviesToRow('Sci-Fi', movies));
            window.fetchThrillerMovies().then(movies => addMoviesToRow('Thriller', movies));
            break;
    }
}

/**
 * Loads movies based on the selected category and displays them as cards. 
 * @param {string} title - The title to show for the row.
 * @param {MovieDetails[]} movies - The Movie array containing movie objects and its details.
 * @returns {void}
 */
function addMoviesToRow(title, movies) {
    // Create a title element
    const titleElement = document.createElement('h3');
    titleElement.className = 'category-title pb-4 mb-4';
    titleElement.textContent = title;

    // Create a new row for the movies
    const newMovieCardsRow = document.createElement('div');
    newMovieCardsRow.className = 'row movie-cards-row list-container';

    // Populate the new row with the movies.
    movies.slice(0, 4).forEach(movie => {
        const newMovieCard = createMovieCard(movie, title === 'Upcoming');
        newMovieCardsRow.appendChild(newMovieCard);
    });

    // Get the container and add the title and the movie row
    const mainContainer = document.getElementById('movieCardsRow');
    mainContainer.appendChild(titleElement);
    mainContainer.appendChild(newMovieCardsRow);
}

window.toggleGenre('All');
window.toggleGenre = toggleGenre;


/* Year Filter*/

function toggleYear(year) {
    const yearItems = document.querySelectorAll('.dropdown-item');
    yearItems.forEach(item => item.classList.remove('active')); // Optional: If you want to indicate the active genre

    // const itemId = genre + 'Item';
    // document.getElementById(itemId).classList.add('active');

    const genreCardRow = document.getElementById('movieCardsRow');
    genreCardRow.innerHTML = ''; // Clear previous cards

    switch (year) {
        case '1970-1979':
            window.fetch1970Movies().then(movies => addMoviesToRow('1970-1979', movies));
            break;
        case '1980-1989':
            window.fetch1980Movies().then(movies => addMoviesToRow('1980-1989', movies));
            break;
        case '1990-1999':
            window.fetch1990Movies().then(movies => addMoviesToRow('1990-1999', movies));
            break;
        case '2000-2009':
            window.fetch2000Movies().then(movies => addMoviesToRow('2000-2009', movies));
            break;
        case '2010-2019':
            window.fetch2010Movies().then(movies => addMoviesToRow('2010-2019', movies));
            break;
        case '2020-2024':
            window.fetch2020Movies().then(movies => addMoviesToRow('2020-2024', movies));
            break;
        default:
            window.fetch1970Movies().then(movies => addMoviesToRow('1970-1979', movies));
            window.fetch1980Movies().then(movies => addMoviesToRow('1980-1989', movies));
            window.fetch1990Movies().then(movies => addMoviesToRow('1990-1999', movies));
            window.fetch2000Movies().then(movies => addMoviesToRow('2000-2009', movies));
            window.fetch2010Movies().then(movies => addMoviesToRow('2010-2019', movies));
            window.fetch2020Movies().then(movies => addMoviesToRow('2020-2024', movies));
            break;
    }
}

/**
 * Loads movies based on the selected category and displays them as cards. 
 * @param {string} title - The title to show for the row.
 * @param {MovieDetails[]} movies - The Movie array containing movie objects and its details.
 * @returns {void}
 */
function addMoviesToRow(title, movies) {
    // Create a title element
    const titleElement = document.createElement('h3');
    titleElement.className = 'category-title pb-4 mb-4';
    titleElement.textContent = title;

    // Create a new row for the movies
    const newMovieCardsRow = document.createElement('div');
    newMovieCardsRow.className = 'row movie-cards-row list-container';

    // Populate the new row with the movies.
    movies.slice(0, 4).forEach(movie => {
        const newMovieCard = createMovieCard(movie, title === 'Upcoming');
        newMovieCardsRow.appendChild(newMovieCard);
    });

    // Get the container and add the title and the movie row
    const mainContainer = document.getElementById('movieCardsRow');
    mainContainer.appendChild(titleElement);
    mainContainer.appendChild(newMovieCardsRow);
}

window.toggleYear('All');
window.toggleYear = toggleYear;

/* Rating Filter*/

function toggleRating(rating) {
    const ratingItems = document.querySelectorAll('.dropdown-item');
    ratingItems.forEach(item => item.classList.remove('active')); // Optional: If you want to indicate the active genre

    // const itemId = genre + 'Item';
    // document.getElementById(itemId).classList.add('active');

    const genreCardRow = document.getElementById('movieCardsRow');
    genreCardRow.innerHTML = ''; // Clear previous cards

    switch (rating) {
        case '0-5':
            window.fetch5Movies().then(movies => addMoviesToRow('0-5', movies));
            break;
        case '6-10':
            window.fetch10Movies().then(movies => addMoviesToRow('6-10', movies));
            break;
        default:
            window.fetch5Movies().then(movies => addMoviesToRow('0-5', movies));
            window.fetch10Movies().then(movies => addMoviesToRow('6-10', movies));
            break;
    }
}

/**
 * Loads movies based on the selected category and displays them as cards. 
 * @param {string} title - The title to show for the row.
 * @param {MovieDetails[]} movies - The Movie array containing movie objects and its details.
 * @returns {void}
 */
function addMoviesToRow(title, movies) {
    // Create a title element
    const titleElement = document.createElement('h3');
    titleElement.className = 'category-title pb-4 mb-4';
    titleElement.textContent = title;

    // Create a new row for the movies
    const newMovieCardsRow = document.createElement('div');
    newMovieCardsRow.className = 'row movie-cards-row list-container';

    // Populate the new row with the movies.
    movies.slice(0, 4).forEach(movie => {
        const newMovieCard = createMovieCard(movie, title === 'Upcoming');
        newMovieCardsRow.appendChild(newMovieCard);
    });

    // Get the container and add the title and the movie row
    const mainContainer = document.getElementById('movieCardsRow');
    mainContainer.appendChild(titleElement);
    mainContainer.appendChild(newMovieCardsRow);
}

window.toggleRating('All');
window.toggleRating = toggleRating;




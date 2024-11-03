// Easier for Visual Studio to work with:
/**
 * @typedef {Object} MovieDetails
 * @property {number} id - The movie ID.
 * @property {string} title - The title of the movie.
 * @property {string} overview - A brief overview of the movie's plot.
 * @property {number} rating - Average rating of the movie.
 * @property {string} poster - URL to the movie poster image.
 * @property {string} release_date - The release date of the movie, formatted as 'YYYY-MM-DD'.
 */

/**
 * Fetch details for a specific movie by ID.
 * @param {number} movieId - The ID of the movie to fetch details for.
 * @param {boolean} videos - Whether to include video details.
 * @param {boolean} credits - Whether to include credit details.
 * @returns {Promise<MovieDetails>} An object containing movie details or null if an error occurred.
 */
const fetchMovieDetails = async (movieId, videos = false, credits = false) => {
    try {
        let appendToResponse = [];
        if (videos) appendToResponse.push('videos');
        if (credits) appendToResponse.push('credits');
        const appendQuery = appendToResponse.length ? `?append_to_response=${appendToResponse.join(',')}` : '';

        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}${appendQuery}`, apiOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch movie details: ${response.status}`);
        }
        const data = await response.json();

        const director = credits ? data.credits.crew.find(person => person.job === 'Director')?.name || 'Unknown' : 'N/A';
        const cast = credits ? data.credits.cast.slice(0, 10).map(actor => actor.name).join(', ') : 'N/A';
        const trailer = videos ? data.videos.results.find(video => video.type === 'Trailer')?.key || 'No Trailer' : 'N/A';
        const posterUrl = data.poster_path ? `${posterBaseUrl}${data.poster_path}` : 'No Poster Available';

        return {
            id: movieId, 
            title: data.title,
            director,
            cast,
            overview: data.overview,
            rating: data.vote_average,
            poster: posterUrl,
            trailer: videos && trailer !== 'No Trailer' ? `https://www.youtube.com/watch?v=${trailer}` : 'No Trailer',
            release_date: data.release_date || 'Unknown'
        };
    } catch (error) {
        console.error(`Error fetching details for movie ID ${movieId}:`, error);
        return null; 
    }
};

/**
 * Fetch a list of movies from a given API URL and category.
 * @param {string} url - The API URL to fetch movies from.
 * @param {string} category - The category of movies being fetched (e.g., 'Upcoming', 'Top-Rated').
 * @returns {Promise<Array<MovieDetails>>} An array of movie details objects.
 */
const fetchMovies = async (url, category) => {
    try {
        const response = await fetch(url, apiOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${category} movies: ${response.status}`);
        }
        const data = await response.json();
    
        const movieDetails = data.results.slice(0, 15).map(movie => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            rating: movie.vote_average,
            poster: movie.poster_path ? `${posterBaseUrl}${movie.poster_path}` : 'No Poster Available',
            release_date: movie.release_date || 'Unknown'
        }));
    
        return movieDetails;
    } catch (error) {
        console.error(`Error fetching ${category} movies:`, error);
    }
};


/**
 * Fetch upcoming movies.
 * @returns {Promise<Array<MovieDetails>>} An array of upcoming movie details.
 */
const fetchUpcomingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/upcoming?region=za&language=en-US&page=1';
    return await fetchMovies(url, 'Upcoming');
};

/**
 * Fetch top-rated movies.
 * @returns {Promise<Array<MovieDetails>>} An array of top-rated movie details.
 */
const fetchTopRatedMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?region=za&language=en-US&page=1';
    return await fetchMovies(url, 'Top-Rated');
};

/**
 * Fetch popular movies.
 * @returns {Promise<Array<MovieDetails>>} An array of popular movie details.
 */
const fetchPopularMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/popular?region=za&language=en-US';
    return await fetchMovies(url, 'Popular');
};

/**
 * Fetch movies that are currently playing in theaters.
 * @returns {Promise<Array<MovieDetails>>} An array of premiere movie details.
 */
const fetchPremiereMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?region=za&language=en-US';
    return await fetchMovies(url, 'Premiere');
};

// Expose functions globally so they can be called from HTML



/**
 * MovieList
 * Fetch action movies.
 * @returns {Promise<Array<MovieDetails>>} An array of upcoming movie details.
 */
const fetchActionMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28';
    return await fetchMovies(url, 'Action');
};

/**
 * Fetch Animation movies.
 * @returns {Promise<Array<MovieDetails>>} An array of upcoming movie details.
 */
const fetchAnimationMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16';
    return await fetchMovies(url, 'Animation');
};

/**
 * Fetch Biography movies.
 * @returns {Promise<Array<MovieDetails>>} An array of upcoming movie details.
 */
const fetchBiographyMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=36';
    return await fetchMovies(url, 'Biography');
};

/**
 * Fetch Crime movies.
 * @returns {Promise<Array<MovieDetails>>} An array of crime movie details.
 */
const fetchCrimeMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80';
    return await fetchMovies(url, 'Crime');
};

/**
 * Fetch Documentary movies.
 * @returns {Promise<Array<MovieDetails>>} An array of documentary movie details.
 */
const fetchDocumentaryMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99';
    return await fetchMovies(url, 'Documentary');
};

/**
 * Fetch Drama movies.
 * @returns {Promise<Array<MovieDetails>>} An array of drama movie details.
 */
const fetchDramaMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18';
    return await fetchMovies(url, 'Drama');
};

/**
 * Fetch Fantasy movies.
 * @returns {Promise<Array<MovieDetails>>} An array of fantasy movie details.
 */
const fetchFantasyMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=14';
    return await fetchMovies(url, 'Fantasy');
};

/**
 * Fetch Horror movies.
 * @returns {Promise<Array<MovieDetails>>} An array of horror movie details.
 */
const fetchHorrorMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27';
    return await fetchMovies(url, 'Horror');
};

/**
 * Fetch Sci-Fi movies.
 * @returns {Promise<Array<MovieDetails>>} An array of sci-fi movie details.
 */
const fetchSciFiMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=878';
    return await fetchMovies(url, 'Sci-Fi');
};

/**
 * Fetch Thriller movies.
 * @returns {Promise<Array<MovieDetails>>} An array of thriller movie details.
 */
const fetchThrillerMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53';
    return await fetchMovies(url, 'Thriller');
};

window.fetchActionMovies = fetchActionMovies;
window.fetchAnimationMovies = fetchAnimationMovies;
window.fetchBiographyMovies = fetchBiographyMovies;
window.fetchCrimeMovies = fetchCrimeMovies;
window.fetchDocumentaryMovies = fetchDocumentaryMovies;
window.fetchDramaMovies = fetchDramaMovies;
window.fetchFantasyMovies = fetchFantasyMovies;
window.fetchHorrorMovies = fetchHorrorMovies;
window.fetchSciFiMovies = fetchSciFiMovies;
window.fetchThrillerMovies = fetchThrillerMovies;

/**
 * Fetch 1970-1979 movies.
 * @returns {Promise<Array<MovieDetails>>} An array of movie details from 1970-1979.
 */
const fetch1970Movies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&sort_by=popularity.desc&release_date.gte=1970-01-01&release_date.lte=1979-12-31';
    return await fetchMovies(url, '1970-1979');
};

/**
 * Fetch 1980-1989 movies.
 * @returns {Promise<Array<MovieDetails>>} An array of movie details from 1980-1989.
 */
const fetch1980Movies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&sort_by=popularity.desc&release_date.gte=1980-01-01&release_date.lte=1989-12-31';
    return await fetchMovies(url, '1980-1989');
};

/**
 * Fetch 1990-1999 movies.
 * @returns {Promise<Array<MovieDetails>>} An array of movie details from 1990-1999.
 */
const fetch1990Movies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&sort_by=popularity.desc&release_date.gte=1990-01-01&release_date.lte=1999-12-31';
    return await fetchMovies(url, '1990-1999');
};

/**
 * Fetch 2000-2009 movies.
 * @returns {Promise<Array<MovieDetails>>} An array of movie details from 2000-2009.
 */
const fetch2000Movies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&sort_by=popularity.desc&release_date.gte=2000-01-01&release_date.lte=2009-12-31';
    return await fetchMovies(url, '2000-2009');
};

/**
 * Fetch 2010-2019 movies.
 * @returns {Promise<Array<MovieDetails>>} An array of movie details from 2010-2019.
 */
const fetch2010Movies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&sort_by=popularity.desc&release_date.gte=2010-01-01&release_date.lte=2019-12-31';
    return await fetchMovies(url, '2010-2019');
};

/**
 * Fetch 2020-2024 movies.
 * @returns {Promise<Array<MovieDetails>>} An array of movie details from 2020-2024.
 */
const fetch2020Movies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&sort_by=popularity.desc&release_date.gte=2020-01-01&release_date.lte=2024-12-31';
    return await fetchMovies(url, '2020-2024');
};

window.fetch1970Movies = fetch1970Movies;
window.fetch1980Movies = fetch1980Movies;
window.fetch1990Movies = fetch1990Movies;
window.fetch2000Movies = fetch2000Movies;
window.fetch2010Movies = fetch2010Movies;
window.fetch2020Movies = fetch2020Movies;


/**
 * Fetch 0-5 movies.
 * @returns {Promise<Array<MovieDetails>>} An array of movie details from 2010-2019.
 */
const fetch5Movies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=5';
    return await fetchMovies(url, '0-5');
};

/**
 * Fetch 6-10 movies.
 * @returns {Promise<Array<MovieDetails>>} An array of movie details from 2020-2024.
 */
const fetch10Movies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=5&vote_average.lte=10';
    return await fetchMovies(url, '6-10');
};

window.fetch5Movies = fetch5Movies;
window.fetch10Movies = fetch10Movies;
window.fetchMovieDetails = fetchMovieDetails;

window.fetchUpcomingMovies = fetchUpcomingMovies;
window.fetchTopRatedMovies = fetchTopRatedMovies;
window.fetchPopularMovies = fetchPopularMovies;
window.fetchPremiereMovies = fetchPremiereMovies;

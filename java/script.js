const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDQ5ZmZlMzI0YzE2MTBhNTQ3YTNkZjM1MGYwMzQ5YyIsIm5iZiI6MTcyOTUxODYyNS4yNDA3OCwic3ViIjoiNjcwM2RiODQxNzRhMWQ1NzczNzk1ZTMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.tOd4VXs8hjRjVXXXAFvrPLyD1_RToPDd27IQvrOxa14'
  }
};

const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';

const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos`, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status}`);
    }
    const data = await response.json();

    const director = data.credits.crew.find(person => person.job === 'Director')?.name || 'Unknown';
    const cast = data.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
    const trailer = data.videos.results.find(video => video.type === 'Trailer')?.key || 'No Trailer';
    const posterUrl = data.poster_path ? `${posterBaseUrl}${data.poster_path}` : 'No Poster Available';

    return {
      id: movieId, 
      title: data.title,
      director,
      cast,
      overview: data.overview,
      rating: data.vote_average,
      poster: posterUrl,
      trailer: `https://www.youtube.com/watch?v=${trailer}`,
      release_date: data.release_date || 'Unknown'
    };
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null; 
  }
};

const fetchMovies = async (url, category) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${category} movies: ${response.status}`);
    }
    const data = await response.json();

    const movieDetailsPromises = data.results.slice(0, 15).map(movie => fetchMovieDetails(movie.id));
    const movieDetails = await Promise.all(movieDetailsPromises);

    console.log(`${category} Movies:`, movieDetails);
    return movieDetails; // Optional: you can return movie details for further use
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
  }
};

const fetchUpcomingMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
  await fetchMovies(url, 'Upcoming');
};

const fetchTopRatedMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  await fetchMovies(url, 'Top-Rated');
};

// Updated genres array with additional genres: Drama, Fantasy, Horror, Sci-Fi, Thriller
const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 99, name: 'Biography (Documentary)' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },       // Drama
  { id: 14, name: 'Fantasy' },     // Fantasy
  { id: 27, name: 'Horror' },      // Horror
  { id: 878, name: 'Sci-Fi' },     // Sci-Fi
  { id: 53, name: 'Thriller' },    // Thriller
  { id: 99, name: 'Documentary' }
];

const fetchMoviesByGenre = async (genreId, genreName) => {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
  await fetchMovies(url, genreName);
};

genres.forEach(genre => fetchMoviesByGenre(genre.id, genre.name));

const fetchTrendingMovies = async () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
  await fetchMovies(url, 'Trending Now');
};

const fetchPopularMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US';
  await fetchMovies(url, 'Popular');
};

const fetchPremiereMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US';
  await fetchMovies(url, 'Premiere');
};

// Start fetching movies for all categories
fetchUpcomingMovies();
fetchTopRatedMovies();
fetchTrendingMovies();
fetchPopularMovies();
fetchPremiereMovies();





//andre
//signIn page
const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");


loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "#21264D";
    registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";

    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";

    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
})

registerBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    registerBtn.style.backgroundColor = "#21264D";

    loginForm.style.left = "150%";
    registerForm.style.left = "50%";

    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;
})

const logInputField = document.getElementById('logPassword');
const logInputIcon = document.getElementById('log-pasword');

const regInputField = document.getElementById('registerPassword');
const regInputIcon = document.getElementById('reg-pass-icon');

function myLogPassword(){
    if(logInputField.type === "password"){
        logInputField.type = "text";

        logInputIcon.name = "eye-off-outline";
        logInputIcon.style.cursor = "pointer";
    }
    else{
        logInputField.type = "password";

        logInputIcon.name = "eye-outline";
        logInputIcon.style.cursor = "pointer";

    }
}

function myRegPassword(){
    if(regInputField.type === "password"){
        regInputField.type = "text";

        regInputIcon.name = "eye-off-outline";
        regInputIcon.style.cursor = "pointer";
    }
    else{
        regInputField.type = "password";

        regInputIcon.name = "eye-outline";
        regInputIcon.style.cursor = "pointer";

    }
}

function changeIcon(value){
    if(value.length > 0){
        logInputIcon.name = "eye-outline";
        regInputIcon.name = "eye-outline";
    }else{
        logInputIcon.name = "lock-closed-outline";
        regInputIcon.name = "lock-closed-outline";
    }
}





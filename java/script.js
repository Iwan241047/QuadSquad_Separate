const from = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('username')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')

//Juliette

// Define common options for fetch requests
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWRiYmRjMzFjM2M2MDgwMzlhMTI5OTQwN2EwMDIyZSIsIm5iZiI6MTcyOTA4MDc4MC42MTE5MzEsInN1YiI6IjY3MDNkYjg0MTc0YTFkNTc3Mzc5NWUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cD8EeJn5B_vExqSjpWULT2bfVKFw55ipTDQ_4UTbFJc'
    }
  };
  
  // Base URL for posters from TMDb
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
  
  // Function to fetch movie details (director, cast, trailer, and poster) using movie ID
  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos`, options);
      if (!response.ok) {
        throw new Error(`Failed to fetch movie details: ${response.status}`);
      }
      const data = await response.json();
  
      // Extract director, cast, trailer, poster, and release date details
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
        poster: posterUrl,  // Poster URL
        trailer: `https://www.youtube.com/watch?v=${trailer}`,
        release_date: data.release_date || 'Unknown'
      };
    } catch (error) {
      console.error(`Error fetching details for movie ID ${movieId}:`, error);
      return null; // Return null in case of error to avoid breaking Promise.all
    }
  };
  
  // Function to fetch a list of movies and their details by URL and category
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
  
  // Fetch upcoming movies
  const fetchUpcomingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    await fetchMovies(url, 'Upcoming');
  };
  
  // Fetch top-rated movies
  const fetchTopRatedMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    await fetchMovies(url, 'Top-Rated');
  };
  
  // Genres array
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 99, name: 'Biography (Documentary)' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' }
  ];
  
  // Function to fetch movies by genre
  const fetchMoviesByGenre = async (genreId, genreName) => {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
    await fetchMovies(url, genreName);
  };
  
  // Fetch movies for each genre
  genres.forEach(genre => fetchMoviesByGenre(genre.id, genre.name));
  
  // Fetch trending movies
  const fetchTrendingMovies = async () => {
    const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
    await fetchMovies(url, 'Trending Now');
  };
  
  // Fetch popular movies
  const fetchPopularMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US';
    await fetchMovies(url, 'Popular');
  };
  
  // Fetch premiere movies (now playing)
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
  
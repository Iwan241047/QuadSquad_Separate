/**
 * apiOptions used for fetch requests to the Movie Database API.
 * Contains method type and authorization headers.
 */
const apiOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDE4OGY5N2I3OTQ3YmIxM2E3N2FhMjgzM2YxZWNiZSIsIm5iZiI6MTcyOTc1OTI5Mi42ODUxNDcsInN1YiI6IjY3MTBjNjFkMWI5MTJhZGQyZWRiY2QwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.79Xo8DabsJftkgYvH8HWG_B108-bF0Km9kTfh2Xycw0'
    }
};

/**
 * Base URL for accessing movie poster images.
 */
const posterBaseUrl = 'https://image.tmdb.org/t/p/original';
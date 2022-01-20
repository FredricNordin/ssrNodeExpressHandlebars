import fetch from "node-fetch";

// Fetch list
export async function fetchMovies() {
  const response = await fetch("https://lernia-kino-cms.herokuapp.com/api/movies");
  const movies = await response.json();
  return movies.data;
}

// Fetch id
export async function fetchMovie(id) {
  const response = await fetch("https://lernia-kino-cms.herokuapp.com/api/movies/" + id);
  const movies = await response.json();
  return movies.data;
}
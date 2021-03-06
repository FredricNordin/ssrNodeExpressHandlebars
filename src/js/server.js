// Imports.
import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import { fetchMovie, fetchMovies } from "./fetchMovies.js";

// Express, handlebars & markdown settings.
const server = express();
export default server; // Export so jest & supertest can do test.

server.use(express.static("./src/static"));
server.set("view engine", "handlebars");
server.set("views", "./src/handlebars");
server.engine(
  "handlebars",
  engine({
    helpers: {
      markdown: (md) => marked(md),
    },
  })
);

// Route displaying all listed movies.
server.get("/", async (request, response) => {
  const movies = await fetchMovies();
  if (movies) {
    response.render("movies", { movies });
  } else {
    response.status(404).render("error");
  }
});

// Route display a single movie from ID else display an error.
server.get("/movies/:movieId", async (request, response) => {
  const movie = await fetchMovie(request.params.movieId);
  if (movie) {
    response.render("movie", { movie });
  } else {
    response.status(404).render("error");
  }
});

// Route display an error if any URL is not matching an existing one.
server.get("/*", async (request, response) => {
  response.status(404).render("error");
});
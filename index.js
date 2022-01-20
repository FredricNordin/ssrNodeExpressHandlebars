// Imports
import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import { fetchMovie, fetchMovies } from "./fetchMovies.js";

// Express, handlebars & marked settings
const server = express();
server.use(express.static("public"));
server.set("view engine", "handlebars");
server.set("views", "./handlebars");
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
  response.render("movies", { movies });
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

// Server port setting
server.listen(5080);
console.log("SERVER IS RUNNING ON PORT 5080");

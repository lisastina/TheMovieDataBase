import React from "react";
import { useParams } from "react-router";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useQuery } from "react-query";
import { getSingleMovie } from "../../services/movieAPI";
import Card from "../Card";
import SimilarMovies from "../SimilarMovies";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const {
    data: movie,
    error,
    isError,
    isLoading,
  } = useQuery(["singleMovie", movieId], () => {
    return getSingleMovie(movieId);
  });

  return (
    <Container>
      {isLoading && <p className="my-3">Loading...</p>}

      {isError && (
        <Alert variant="warning" className="my-3">
          <strong>Error:</strong> {error.message}
        </Alert>
      )}
      {movie && (
        <div>
          <div className="d-flex justify-content-evenly flex-wrap">
            <div style={{ maxWidth: "400px" }}>
              <h1 className="my-3">{movie.original_title}</h1>
              <h4>Rating: {movie.vote_average} / 10</h4>
              <h4>{movie.tagline}</h4>
              <p>{movie.overview}</p>
              <h5>Runtime: {movie.runtime} min</h5>
              <h4>Genres:</h4>
              <ul>
                {movie.genres.map((genre) => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            </div>
            {/* Movie poster */}
            <div>
              {movie.poster_path && (
                <img
                  className="m-4"
                  style={{ maxWidth: "300px", borderRadius: ".5rem" }}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
            </div>
          </div>

          {/* Actors cards */}
          <h3>Actors:</h3>
          <Container className="movie-list small">
            {movie.credits?.cast.map((actor) => {
              return (
                <Card
                  data={{
                    type: "actor",
                    img: actor.profile_path,
                    title: actor.name,
                    id: actor.id,
                  }}
                  key={actor.id}
                />
              );
            })}
          </Container>
          {/* Similar movies */}
          <h3 className="my-4">Similar movies:</h3>
          <SimilarMovies movieId={movieId} />
        </div>
      )}
    </Container>
  );
};

export default MovieDetailsPage;

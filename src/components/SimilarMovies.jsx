import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useQuery } from "react-query";
import { getSimilarMovies } from "../services/movieAPI";
import Card from "./Card";

const SimilarMovies = ({ movieId }) => {
  const {
    data: movies,
    error,
    isError,
    isLoading,
  } = useQuery(["similarMovies", movieId], () => {
    return getSimilarMovies(movieId);
  });

  return (
    <Container>
      {isLoading && <p className="my-3">Loading...</p>}

      {isError && (
        <Alert variant="warning" className="my-3">
          <strong>Error:</strong> {error.message}
        </Alert>
      )}

      <Container className="movie-list small">
        {movies?.results &&
          movies.results.map((movie) => {
            return (
              <Card
                data={{
                  type: "movie",
                  img: movie.poster_path,
                  title: movie.title,
                  id: movie.id,
                }}
                key={movie.id}
              />
            );
          })}
      </Container>
    </Container>
  );
};

export default SimilarMovies;

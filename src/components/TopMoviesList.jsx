import React from "react";
import Container from "react-bootstrap/Container";
import Card from "./Card";
import { useQuery } from "react-query";
import { getTopMovies } from "../services/movieAPI";
import Alert from "react-bootstrap/Alert";

const TopMoviesList = ({ typeToGet }) => {
  const {
    data: movies,
    error,
    isError,
    isLoading,
  } = useQuery([typeToGet], () => {
    return getTopMovies(typeToGet);
  });

  return (
    <Container className="movie-list">
      {isLoading && <p className="my-3">Loading...</p>}

      {isError && (
        <Alert variant="warning" className="my-3">
          <strong>Error:</strong> {error.message}
        </Alert>
      )}
      {movies?.results &&
        movies.results.slice(0, 10).map((movie) => {
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
  );
};

export default TopMoviesList;

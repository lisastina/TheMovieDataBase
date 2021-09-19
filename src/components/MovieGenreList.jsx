import React from "react";
import Container from "react-bootstrap/Container";
import Card from "./Card";

const MovieGenreList = ({ movies }) => {
  return (
    <Container className="movie-list">
      {/* <h2>genre</h2> */}
      {movies &&
        movies.map((movie) => {
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

export default MovieGenreList;

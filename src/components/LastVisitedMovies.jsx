import React from "react";
import Container from "react-bootstrap/Container";
import Card from "./Card";
import useLocalStorage from "../hooks/useLocalStorage";

const LastVisitedMovies = () => {
  const [localStorageMovies, setLocalStorageMovies] = useLocalStorage(
    "LastVisitedMovies",
    []
  );

  return (
    <div
      bg="danger"
      variant="dark"
      expand="md"
      className="bg-danger mt-4"
      style={{ padding: "3rem" }}
    >
      <h4 className="text-center mb-4">Latest visited movies:</h4>
      <Container className="movie-list small">
        {localStorageMovies &&
          localStorageMovies.map((movie) => {
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
    </div>
  );
};

export default LastVisitedMovies;

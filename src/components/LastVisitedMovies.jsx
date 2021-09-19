import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "./Card";
import Navbar from "react-bootstrap/Navbar";
import useLocalStorage from "../hooks/useLocalStorage";

const LastVisitedMovies = () => {
  const [movies, setMovies] = useState();
  const [localStorageMovies, setLocalStorageMovies] = useLocalStorage(
    "LastVisitedMovies",
    []
  );

  useEffect(() => {
    setMovies(localStorageMovies);
  }, [localStorageMovies]);

  return (
    <div
      bg="danger"
      variant="dark"
      expand="md"
      className="bg-danger"
      style={{ padding: "3rem" }}
    >
      <h4 className="text-center mb-4">Latest visited movies:</h4>
      <Container className="movie-list small">
        {movies &&
          movies.map((movie) => {
            return (
              <Card
                data={{
                  type: "movie",
                  img: movie.img,
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

import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";

const movieCard = ({ data }) => {
  const history = useHistory();
  const [localStorageMovies, setLocalStorageMovies] = useLocalStorage(
    "LastVisitedMovies",
    ""
  );

  const savedMovies = localStorageMovies;

  const handleClick = async () => {
    if (data.type === "movie") {
      /* if there are more than 10 movies in the array, remove the last one */
      if (savedMovies.length >= 10) {
        savedMovies.pop();
      }
      /* Check if movie is already in array */
      if (
        !savedMovies.filter((movie) => movie.title === data.title).length > 0
      ) {
        /* save the movie in localStorage */
        savedMovies.unshift(data);
        // setLocalStorageMovies(savedMovies);
        localStorage.setItem("LastVisitedMovies", JSON.stringify(savedMovies));
      }
    }
    history.push(`/${data.type}/${data.id}`);
  };

  return (
    <>
      {data && (
        <Card style={{ cursor: "pointer" }} onClick={handleClick}>
          {data.img && (
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500${data.img}`}
              alt={data.title}
            />
          )}

          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default movieCard;

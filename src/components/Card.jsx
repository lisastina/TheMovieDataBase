import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
// import useLocalStorage from "../hooks/useLocalStorage";

const movieCard = ({ data }) => {
  const history = useHistory();
  // const [localStorageMovies, setLocalStorageMovies] = useLocalStorage(
  //   "LastVisitedMovies",
  //   []
  // );

  // const savedMovies = localStorageMovies;

  return (
    <Link
      to={`/${data.type}/${data.id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      {data && (
        <Card className="card">
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
    </Link>
  );
};

export default movieCard;

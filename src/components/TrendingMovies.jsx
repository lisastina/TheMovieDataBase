import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "./Card";
import { useQuery } from "react-query";
import { getTrendingMovies } from "../services/movieAPI";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const TrendingMovies = () => {
  const [time, setTime] = useState("day");

  const {
    data: movies,
    error,
    isError,
    isLoading,
  } = useQuery(["TrendingMovies", time], () => {
    return getTrendingMovies(time);
  });

  return (
    <>
      <h2 className="mx-4 mt-5 mb-4 text-center">
        Trending movies {time === "day" ? "today" : "this week"}
      </h2>

      <Form.Select
        onChange={(e) => setTime(e.target.value)}
        size="sm"
        style={{
          maxWidth: "10rem",
          margin: "1rem auto",
        }}
      >
        <option value="day">Today</option>
        <option value="week">This week</option>
      </Form.Select>

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
    </>
  );
};

export default TrendingMovies;

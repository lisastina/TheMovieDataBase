import React from "react";
import Container from "react-bootstrap/Container";
import TopMoviesList from "../TopMoviesList";
import TrendingMovies from "../TrendingMovies";

const HomePage = () => {
  return (
    <Container className="py-3">
      <h1>Welcome to The Movie Database!</h1>

      <TrendingMovies />

      <h2 className="mx-4 mt-5 mb-4 text-center">10 most popular movies</h2>
      <TopMoviesList typeToGet="popular" />

      <h2 className="mx-4 mt-5 mb-4 text-center">10 highest ranked movies </h2>
      <TopMoviesList typeToGet="top_rated" />

      <h2 className="mx-4 mt-5 mb-4 text-center">10 Latest movies</h2>
      <TopMoviesList typeToGet="now_playing" />
    </Container>
  );
};

export default HomePage;

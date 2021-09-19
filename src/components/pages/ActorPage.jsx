import React from "react";
import { useParams } from "react-router";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useQuery } from "react-query";
import { getActor, getMoviesByActor } from "../../services/movieAPI";
import Card from "../Card";

const ActorPage = () => {
  const { actorId } = useParams();
  const {
    data: actor,
    error,
    isError,
    isLoading,
  } = useQuery(["Actor", actorId], () => {
    return getActor(actorId);
  });
  const {
    data: movies,
    error: movieError,
    isError: isMovieError,
    isLoading: isMovieLoading,
  } = useQuery(["Movies-by-actor", actorId], () => {
    return getMoviesByActor(actorId);
  });

  return (
    <Container>
      {isLoading && <p className="my-3">Loading...</p>}

      {isError && (
        <Alert variant="warning" className="my-3">
          <strong>Error:</strong> {error.message}
        </Alert>
      )}
      {actor && (
        <div>
          <div className="d-flex justify-content-evenly flex-wrap">
            <div style={{ maxWidth: "400px" }}>
              <h1 className="my-3">{actor.name}</h1>
              <h4>About</h4>
              <p>{actor.biography}</p>

              {isMovieLoading && <p className="my-3">Loading...</p>}

              {isMovieError && (
                <Alert variant="warning" className="my-3">
                  <strong>Error:</strong> {movieError.message}
                </Alert>
              )}
            </div>

            {/* Actor pic */}
            <div>
              {actor.profile_path && (
                <img
                  className="m-4"
                  style={{ maxWidth: "300px", borderRadius: ".5rem" }}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
            </div>
          </div>
          <h4>Movies:</h4>
          <Container className="movie-list small">
            {movies &&
              movies.results?.map((movie) => {
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
      )}
    </Container>
  );
};

export default ActorPage;

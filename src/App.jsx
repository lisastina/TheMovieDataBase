import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import PageNotFound from "./components/pages/PageNotFound";
import Navbar from "./components/Navbar";
import MoviePage from "./components/pages/MoviePage";
import MovieDetailsPage from "./components/pages/MovieDetailsPage";
import ActorPage from "./components/pages/ActorPage";
import LastVisitedMovies from "./components/LastVisitedMovies";
import ScrollToTop from "./util/ScrollToTop";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/movies/:genreId?">
          <MoviePage />
        </Route>

        <Route path="/movie/:movieId">
          <MovieDetailsPage />
        </Route>

        <Route exact path="/actor/:actorId">
          <ActorPage />
        </Route>

        <Route>
          <PageNotFound />
        </Route>
      </Switch>

      <LastVisitedMovies />
    </div>
  );
}

export default App;

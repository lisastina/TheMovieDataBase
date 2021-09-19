import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import MovieGenreList from "../MovieGenreList";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { getMoviesByGenre, searchMovies } from "../../services/movieAPI";
import { useUrlSearchParams } from "use-url-search-params";
import { useSearchContext } from "../../contexts/SearchContext";

const MoviePage = () => {
  const [searchParams, setSearchParams] = useUrlSearchParams(
    { page: 1, search: "" },
    { page: Number, search: String }
  );

  const { searchQuery, setSearchQuery, page, setPage } = useSearchContext();
  // const [page, setPage] = useState(searchParams.page);
  const { genreId } = useParams();

  useEffect(() => {
    /* Without this the search will not survive refresh.
    Because the states is placed outside this file I can't set them to be "searchParams..." by default*/
    setSearchQuery(searchParams.search);
    setPage(searchParams.page);
  }, []);

  const { data, error, isError, isLoading, isPreviousData } = useQuery(
    searchQuery ? ["movies", searchQuery, page] : ["movies", genreId, page],
    () => {
      /* use diffrent get-functins depending on if the user searched or not */
      if (searchQuery) {
        return searchMovies(searchQuery, page);
      } else {
        return getMoviesByGenre(genreId, page);
      }
    },
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setSearchParams({ ...searchParams, page, search: searchQuery });
  }, [page, searchQuery]);

  return (
    <Container>
      <h1 className="my-3">Our Movies</h1>
      {isLoading && <p className="my-3">Loading...</p>}

      {isError && (
        <Alert variant="warning" className="my-3">
          <strong>Error:</strong> {error.message}
        </Alert>
      )}
      {data?.results.length ? (
        <MovieGenreList movies={data.results} />
      ) : (
        <h3 className="text-center">No movies matched your preferences...</h3>
      )}

      <Container className="my-5 d-flex justify-content-between align-items-center">
        <Button
          variant="secondary"
          onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </Button>

        <span>Current Page: {page}</span>

        <Button
          variant="secondary"
          onClick={() => {
            if (!isPreviousData && page !== data.total_pages) {
              setPage((currentPage) => currentPage + 1);
            }
          }}
          disabled={isPreviousData || page >= data?.total_pages}
        >
          Next Page
        </Button>
      </Container>
    </Container>
  );
};

export default MoviePage;

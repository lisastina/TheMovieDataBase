import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getGenres } from "../services/movieAPI";
import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";

const Navigation = () => {
  const { data, error, isError, isLoading } = useQuery(["genres"], () => {
    return getGenres();
  });
  const history = useHistory();
  const { searchQuery, setSearchQuery, page, setPage } = useSearchContext();
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search !== "") {
      setSearchQuery(search);
      history.push(`/movies/?page=1&search=${search}`);
      setSearch("");
      setPage(1);
    }
  };

  return (
    <Navbar bg="danger" variant="dark" expand="md">
      <Container>
        <Link to="/" className="navbar-brand text-light">
          The Movie Database
          <span role="img" aria-label="popcorn">
            🍿
          </span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* search field */}
            <Form className="mx-4 my-2" onSubmit={handleSearchSubmit}>
              <Form.Label htmlFor="search" visuallyHidden>
                Search
              </Form.Label>
              <InputGroup>
                <FormControl
                  id="search"
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <Button type="submit" className="btn-info">
                  🔍
                </Button>
              </InputGroup>
            </Form>

            <NavDropdown
              className="text-white"
              title="Genres"
              id="basic-nav-dropdown"
            >
              {isLoading && <p className="my-3">Loading...</p>}

              {isError && (
                <Alert variant="warning" className="my-3">
                  <strong>Error:</strong> {error.message}
                </Alert>
              )}

              {data?.genres &&
                data.genres.map((genre) => {
                  return (
                    <NavLink
                      to={`/movies/${genre.id}`}
                      className="dropdown-item"
                      key={genre.id}
                      /* Clear search field when selecting genre */
                      onClick={() => setSearchQuery("")}
                    >
                      {genre.name}
                    </NavLink>
                  );
                })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

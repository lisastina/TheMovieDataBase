import React, { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

const SearchContextProvider = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState();

  const values = {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
  };

  return (
    <SearchContext.Provider value={values}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;

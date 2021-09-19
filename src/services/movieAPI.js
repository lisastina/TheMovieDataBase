/*
 * https://api.themoviedb.org/3/movie/550?api_key=8840b566963c78c59aa23d125bbba718
 *
 *
 *
 */
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const key = "?api_key=8840b566963c78c59aa23d125bbba718";

const get = async (endpoint) => {
  const response = await axios.get(endpoint);

  return response.data;
};

export const getGenres = async () => {
  return await get(`/genre/movie/list${key}`);
};

export const getMoviesByGenre = async (genre = null, page = 1) => {
  return await get(`/discover/movie${key}&page=${page}&with_genres=${genre}`);
};

export const getTopMovies = async (typeToGet) => {
  return await get(`/movie/${typeToGet}${key}`);
};

export const getSingleMovie = async (movieId) => {
  return await get(`/movie/${movieId}${key}&append_to_response=credits`);
};

export const getActor = async (actorId) => {
  return await get(`/person/${actorId}${key}`);
};

export const getMoviesByActor = async (actorId) => {
  return await get(`/discover/movie${key}&with_people=${actorId}`);
};

export const searchMovies = async (query, page) => {
  return await get(`/search/movie${key}&query=${query}&page=${page}`);
};

export const getTrendingMovies = async (time) => {
  return await get(`/trending/movie/${time}${key}`);
};

export const getSimilarMovies = async (movieId) => {
  return await get(`/movie/${movieId}/similar${key}`);
};

export default {
  getGenres,
  getSingleMovie,
  getActor,
  getMoviesByActor,
  getMoviesByGenre,
  getTopMovies,
  searchMovies,
  getSimilarMovies,
};

import { SET_TEST_TEXT, SET_FILMS } from "./types";

export const setTestText = (text) => ({
  type: SET_TEST_TEXT,
  text,
});

export const setFilms = (films) => ({
  type: SET_FILMS,
  films,
});

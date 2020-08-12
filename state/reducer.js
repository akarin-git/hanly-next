import { SET_TEST_TEXT, SET_FILMS } from "./types";

export const initialState = {
  text: "",
  films: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_TEST_TEXT:
      return { ...state, text: action.text };
    case SET_FILMS:
      return { ...state, films: action.films };
    default:
      return state;
  }
};

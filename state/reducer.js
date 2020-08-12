import { SET_USER } from "./types";

export const initialState = {
  user: undefined,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

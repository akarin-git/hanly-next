import { SET_USER, UPDATE_USER } from "./types";

export const initialState = {
  user: undefined,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.update } };
    default:
      return state;
  }
};

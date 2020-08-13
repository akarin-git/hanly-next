import { SET_USER, UPDATE_USER } from "./types";

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const updateUser = (update) => ({
  type: UPDATE_USER,
  update,
});

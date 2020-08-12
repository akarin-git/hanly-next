import { useReducer } from "react";
import axios from "axios";
import { reducer, initialState } from "state/reducer";
import Context from "context";
import { API_ENDPOINT } from "constants.js";
import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  if (process.browser && window.localStorage.getItem("hanly_access_token")) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + window.localStorage.getItem("hanly_access_token");
  }
  axios.defaults.baseURL = API_ENDPOINT;

  return (
    <Context.Provider value={{ state, dispatch, axios }}>
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;

import { useReducer, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { reducer, initialState } from "state/reducer";
import { setUser } from "state/actions";
import Context from "context";
import { API_ENDPOINT } from "constants.js";
import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const accessToken = process.browser
    ? window.localStorage.getItem("hanly_access_token")
    : "";

  useEffect(() => {
    axios.defaults.baseURL = API_ENDPOINT;

    if (process.browser) {
      if (
        router.route !== "/" &&
        router.route !== "/signup" &&
        router.route !== "/signin"
      ) {
        if (!accessToken) {
          router.replace("/signin");
        } else {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + accessToken;
          axios.get("/api/me").then(({ data }) => {
            dispatch(setUser(data));
          });
        }
      }
    }
  }, [axios, accessToken]);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        axios,
        accessToken,
      }}
    >
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;

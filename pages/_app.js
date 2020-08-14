import { useReducer, useEffect } from "react";

import { reducer, initialState } from "state/reducer";
import { setUser } from "state/actions";
import Context from "context";
import { useAppRouter, useAppAxiosExecute } from "hooks";
import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [router, { needAuth }] = useAppRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [{ data: user }, fetchUser] = useAppAxiosExecute({
    url: "/api/me",
  });

  useEffect(() => {
    if (process.browser && needAuth) {
      if (!window.localStorage.getItem("hanly_access_token")) {
        router.replace("/signin");
      } else {
        fetchUser();
      }
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch, setUser, user]);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;

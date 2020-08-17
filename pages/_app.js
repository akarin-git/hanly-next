import { useReducer, useEffect } from "react";

import { useAppRouter, useAppAxiosExecute } from "hooks";
import useMe from "data/me";
import Loader from "components/Loader";
import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [router, { needAuth }] = useAppRouter();
  const { me, loading, loggedOut } = useMe();

  useEffect(() => {
    if (loggedOut && needAuth) {
      router.replace("/signin");
    }
  }, [me, loading]);

  return !needAuth || me ? <Component {...pageProps} /> : <Loader />;
}

export default MyApp;

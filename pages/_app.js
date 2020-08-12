import { useReducer } from "react";
import Context from "../context";
import { reducer, initialState } from "../state/reducer";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;

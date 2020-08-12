import { useContext, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import SimpleForm from "../components/SimpleForm";
import Context from "../context";
import { setTestText, setFilms } from "../state/actions";

export default function Home() {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then((response) => response.json())
      .then((result) => {
        dispatch(setFilms(result));
      });
  }, [dispatch, setFilms]);

  const updateText = (value) => {
    dispatch(setTestText(value));
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Link href="/test">
          <a>TESTへ</a>
        </Link>
        <SimpleForm initialValue="初期値だよ" onSubmit={updateText} />
        <p>state.text は {state.text} です</p>
        <p>{!state.films.length ? "Loading..." : state.films[0].title}</p>
      </div>
    </Layout>
  );
}

import styles from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import Button from "../components/Button";

export default function Home() {
  return (
    <Layout>
      <div>
        <div className={styles.imgWrap}>
          <img
            src="https://res.cloudinary.com/kiyopikko/image/upload/v1561802660/hanly-splash_ushtah.png"
            alt="Hanly"
            width="178"
          />
        </div>
        <div className={styles.buttons}>
          <Button href="/signin">ログイン</Button>
          <Button href="/signup">新規登録</Button>
        </div>
      </div>
    </Layout>
  );
}

import styles from "styles/Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loaderWrap}>
      <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default React.memo(Loader);

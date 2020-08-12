import styles from "../styles/Button.module.scss";

function Button({ children, onClick, href }) {
  return (
    <>
      {href ? (
        <Link href={href}>
          <a className={styles.btn}>{children}</a>
        </Link>
      ) : (
        <button className={styles.btn} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
}

export default Button;

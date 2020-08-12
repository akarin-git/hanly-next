import classnames from "classnames";
import Link from "next/link";
import styles from "../styles/Button.module.scss";

function Button({ href, disabled, isTxt, children, onClick }) {
  return (
    <>
      {href ? (
        <Link href={href}>
          <a
            className={classnames(styles.btn, {
              [styles.isTxt]: isTxt,
              [styles.isDisabled]: disabled,
            })}
          >
            {children}
          </a>
        </Link>
      ) : (
        <button
          className={classnames(styles.btn, { [styles.isTxt]: isTxt })}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
}

export default Button;

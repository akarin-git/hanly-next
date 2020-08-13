import Link from "next/link";
import styles from "styles/FriendItem.module.scss";

function FriendItem({ href, nickname, date, img, iconPlaceholder }) {
  return (
    <li className={styles.item}>
      <Link href="/friends/[fid]" as={href}>
        <a className={styles.link}>
          {!!img && <img src={img} alt="" className={styles.img} />}
          {!img && (
            <span
              className={styles.placeholder}
              style={{
                background: iconPlaceholder,
              }}
            />
          )}
          <div className={styles.body}>
            <div className={styles.nickname}>{nickname}</div>
            <div className={styles.date}>{date}</div>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default React.memo(FriendItem);

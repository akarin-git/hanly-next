import classnames from "classnames";
import Link from "next/link";
import Head from "next/head";
import { useGeolocation } from "beautiful-react-hooks";

import Layout from "components/Layout";
import FriendItem from "components/FriendItem";
import Loader from "components/Loader";
import { useAppAxiosExecute } from "hooks";
import { dayjs } from "plugins";
import styles from "styles/FriendsPage.module.scss";
import useFriends from "data/friends";
import useMe from "data/me";

const getPlaceholder = (i) =>
  i % 3 === 0
    ? "linear-gradient(141.16deg, #F686AB 11.81%, #FFE177 82.38%)"
    : i % 3 === 1
    ? "linear-gradient(141.16deg, #B7F4EF 11.81%, #E27EA0 85.05%)"
    : "linear-gradient(141.16deg, #FFE073 11.81%, #AFFDF6 85.05%)";

export default function Friends() {
  const [geoState] = useGeolocation();

  const { me } = useMe();
  const { friends, loading, error, refreshFriends } = useFriends();
  const [{ loading: pinning }, pinAndMakeFriends] = useAppAxiosExecute({
    method: "POST",
    url: "/api/my/pin",
  });

  const pin = async () => {
    await pinAndMakeFriends({
      latitude: geoState.position.coords.latitude,
      longitude: geoState.position.coords.longitude,
    });
    refreshFriends();
  };

  return (
    <Layout>
      <Head>
        <title>友だち一覧 | Hanly</title>
      </Head>
      <div>
        {!!me && (
          <Link href="/me">
            <a className={styles.user}>
              <img
                className={styles.user__icon}
                src={
                  me.face_image_url ||
                  "https://res.cloudinary.com/kiyopikko/image/upload/v1561617116/empty-user-image_o4ll8m.png"
                }
              />
              <div className={styles.user__txt}>マイページ</div>
            </a>
          </Link>
        )}
        {loading && <Loader />}
        {!loading && !!friends && !!friends.length && (
          <div className={styles.friends}>
            <h2 className={styles.headline}>友だち</h2>
            {friends.map((friend, i) => (
              <FriendItem
                key={friend.id}
                href={"/friends/" + friend.id}
                nickname={friend.nickname}
                date={
                  friend.pin
                    ? dayjs(friend.pin.datetime).format("YYYY/MM/DD HH:mm")
                    : ""
                }
                img={friend.face_image_url || ""}
                iconPlaceholder={getPlaceholder(i)}
              />
            ))}
          </div>
        )}
        {!loading && !friends.length && (
          <div className={styles.noFriends}>
            <img
              src="https://res.cloudinary.com/kiyopikko/image/upload/v1562219254/hanly-gray_2x_pdy6qo.png"
              alt=""
              width="178"
            />
            <p className={styles.txt}>
              右下のボタンからピンを打って近くの友だちを探しましょう
            </p>
          </div>
        )}
        <button
          className={classnames(styles.pin, { [styles.isPinning]: pinning })}
          disabled={pinning || !geoState.isSupported || !geoState.position}
          onClick={pin}
        />
      </div>
    </Layout>
  );
}

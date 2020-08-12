import { useState } from "react";
import classnames from "classnames";
import Link from "next/link";
import useAxios from "axios-hooks";
import { useGeolocation } from "beautiful-react-hooks";

import Layout from "components/Layout";
import styles from "styles/FriendsPage.module.scss";
import { useAppContext } from "hooks";
import { API_ENDPOINT } from "../../constants";

export default function SignUp() {
  if (!process.browser) return null;

  const [geoState] = useGeolocation();
  const [isPinning, setIsPinning] = useState(false);
  const {
    state: { user },
    axios,
    accessToken,
  } = useAppContext();

  const [{ data: friends, loading, error }, refetch] = useAxios({
    url: API_ENDPOINT + "/api/friends",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const pin = async () => {
    setIsPinning(true);
    await axios.post("/api/my/pin", {
      latitude: geoState.position.coords.latitude,
      longitude: geoState.position.coords.longitude,
    });
    setIsPinning(false);
    refetch();
  };

  return (
    <Layout>
      <div>
        {!!user && (
          <Link href="/me">
            <a className={styles.user}>
              <img
                className={styles.user__icon}
                src={
                  user.face_image_url ||
                  "https://res.cloudinary.com/kiyopikko/image/upload/v1561617116/empty-user-image_o4ll8m.png"
                }
              />
              <div className={styles.user__txt}>マイページ</div>
            </a>
          </Link>
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
          className={classnames(styles.pin, { [styles.isPinning]: isPinning })}
          disabled={isPinning || !geoState.isSupported || !geoState.position}
          onClick={pin}
        />
      </div>
    </Layout>
  );
}

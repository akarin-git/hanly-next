import Head from "next/head";

import Layout from "components/Layout";
import PersonDetail from "components/PersonDetail";
import Loader from "components/Loader";
import { useAppRouter } from "hooks";
import { dayjs } from "plugins";
import useFriend from "data/friend";

export default function Friend() {
  const [router] = useAppRouter();
  const { friend, loading } = useFriend(router.query.fid);

  return (
    <Layout>
      <Head>
        <title>
          {loading || !friend ? "Loading..." : friend.nickname} | Hanly
        </title>
      </Head>
      {loading && <Loader />}
      {!loading && !!friend && (
        <PersonDetail
          nickname={friend.nickname}
          latitude={friend.pin ? friend.pin.latitude : 0}
          longitude={friend.pin ? friend.pin.longitude : 0}
          datetime={
            friend.pin
              ? dayjs(friend.pin.datetime).format("YYYY/MM/DD HH:mm")
              : ""
          }
          faceImageUrl={friend.face_image_url}
        />
      )}
    </Layout>
  );
}

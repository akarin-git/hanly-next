import localStorage from "store2";
import Head from "next/head";

import Layout from "components/Layout";
import PersonDetail from "components/PersonDetail";
import Loader from "components/Loader";
import Button from "components/Base/Button";
import { useAppRouter } from "hooks";
import { dayjs } from "plugins";
import useMe from "data/me";

export default function Me() {
  const [router] = useAppRouter();
  const { me, refreshMe } = useMe();

  const logout = () => {
    localStorage("hanly_access_token", "");
    refreshMe(undefined);
    router.push("/");
  };

  return (
    <Layout>
      <Head>
        <title>プロフィール | Hanly</title>
      </Head>
      {!me && <Loader />}
      {!!me && (
        <PersonDetail
          nickname={me.nickname}
          latitude={me.pin ? me.pin.latitude : 0}
          longitude={me.pin ? me.pin.longitude : 0}
          datetime={
            me.pin ? dayjs(me.pin.datetime).format("YYYY/MM/DD HH:mm") : ""
          }
          faceImageUrl={me.face_image_url}
          canEdit
        />
      )}
      <Button isTxt onClick={logout}>
        ログアウト
      </Button>
    </Layout>
  );
}

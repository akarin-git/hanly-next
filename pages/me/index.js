import Layout from "components/Layout";
import PersonDetail from "components/PersonDetail";
import Loader from "components/Loader";
import Button from "components/Base/Button";
import { useAppContext, useAppRouter } from "hooks";
import { dayjs } from "plugins";
import { setUser } from "state/actions";

export default function Me() {
  const {
    state: { user },
    dispatch,
  } = useAppContext();
  const [router] = useAppRouter();

  const logout = () => {
    window.localStorage.setItem("hanly_access_token", "");
    dispatch(setUser(undefined));
    router.push("/");
  };

  return (
    <Layout>
      {!user && <Loader />}
      {!!user && (
        <PersonDetail
          nickname={user.nickname}
          latitude={user.pin ? user.pin.latitude : 0}
          longitude={user.pin ? user.pin.longitude : 0}
          datetime={
            user.pin ? dayjs(user.pin.datetime).format("YYYY/MM/DD HH:mm") : ""
          }
          faceImageUrl={user.face_image_url}
          canEdit
        />
      )}
      <Button isTxt onClick={logout}>
        ログアウト
      </Button>
    </Layout>
  );
}

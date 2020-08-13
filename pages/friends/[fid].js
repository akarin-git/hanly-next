import { useState } from "react";
import useAxios from "axios-hooks";
import { useRouter } from "next/router";

import Layout from "components/Layout";
import PersonDetail from "components/PersonDetail";
import Loader from "components/Loader";
import { useAppContext } from "hooks";
import { API_ENDPOINT } from "../../constants";

export default function Friend() {
  if (!process.browser) return null;

  const { axios, accessToken, dayjs } = useAppContext();
  const router = useRouter();

  const [{ data: friend, loading, error }] = useAxios({
    url: API_ENDPOINT + "/api/friends/" + router.query.fid,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return (
    <Layout>
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

import { axios } from "plugins";
import localStorage from "store2";
import { API_ENDPOINT } from "../constants";

export const createFetcher = () => (url) =>
  axios({
    method: "GET",
    url: API_ENDPOINT + url,
    headers: {
      Authorization: "Bearer " + localStorage("hanly_access_token"),
    },
  }).then((res) => res.data);

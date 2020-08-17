import { axios } from "plugins";
import { API_ENDPOINT } from "../constants";

export const fetcher = (url) =>
  axios({
    method: "GET",
    url: API_ENDPOINT + url,
    headers: {
      Authorization:
        "Bearer " +
        (process.browser
          ? window.localStorage.getItem("hanly_access_token")
          : ""),
    },
  }).then((res) => res.data);

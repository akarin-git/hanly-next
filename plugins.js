import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ja";

import { API_ENDPOINT } from "./constants";

dayjs.locale("ja");

const accessToken = process.browser
  ? window.localStorage.getItem("hanly_access_token")
  : "";

axios.defaults.baseURL = API_ENDPOINT;
axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

export { axios, dayjs };

import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ja";

import { API_ENDPOINT } from "./constants";

dayjs.locale("ja");
axios.defaults.baseURL = API_ENDPOINT;

export { axios, dayjs };

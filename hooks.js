import { useContext, useState } from "react";
import useAxios from "axios-hooks";
import { useRouter } from "next/router";

import Context from "./context";
import { API_ENDPOINT } from "./constants";
import { axios } from "./plugins";

export const useAppContext = () => {
  return useContext(Context);
};

export const useAppAxios = ({ url, method = "GET" }) => {
  const [{ data, loading, error }, refetch] = useAxios({
    method,
    url: API_ENDPOINT + url,
    headers: {
      Authorization:
        "Bearer " +
        (process.browser
          ? window.localStorage.getItem("hanly_access_token")
          : ""),
    },
  });
  return [{ data, loading, error }, refetch];
};

export const useAppAxiosExecute = ({
  method = "GET",
  url,
  contentType = "application/json",
  errorMessage = "予期せぬエラーが発生しました",
}) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function execute(payload) {
    return new Promise(async (resolve, _reject) => {
      setLoading(true);
      try {
        const headers = {
          Authorization:
            "Bearer " +
            (process.browser
              ? window.localStorage.getItem("hanly_access_token")
              : ""),
        };
        let result;
        if (contentType === "multipart/form-data") {
          result = await axios.post(url, payload, {
            headers,
          });
        } else {
          result = await axios({
            method,
            url,
            data: payload,
            headers,
          });
        }
        setData(result.data);
        resolve(result.data);
      } catch (e) {
        setError(errorMessage);
        setTimeout(() => {
          setError("");
        }, 3000);
      } finally {
        setLoading(false);
      }
    });
  }

  return [
    {
      data,
      error,
      loading,
    },
    execute,
  ];
};

export const useAppRouter = () => {
  const router = useRouter();
  return [
    router,
    {
      needAuth:
        router.route !== "/" &&
        router.route !== "/signup" &&
        router.route !== "/signin",
    },
  ];
};

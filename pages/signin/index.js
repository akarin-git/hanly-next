import { useEffect } from "react";
import localStorage from "store2";
import Head from "next/head";

import Layout from "components/Layout";
import Button from "components/Base/Button";
import SignInForm from "components/SignInForm";
import { useAppRouter, useAppAxiosExecute } from "hooks";
import useMe from "data/me";

export default function SignUp() {
  const [router] = useAppRouter();
  const { refreshMe } = useMe();
  const [
    { loading: fetchingCredentials },
    fetchClientCredentials,
  ] = useAppAxiosExecute({
    url: "/api/oauth/client-credentials",
  });
  const [
    { data, error, loading: signingIn },
    signWithToken,
  ] = useAppAxiosExecute({
    url: "/api/oauth/token",
    method: "POST",
    errorMessage: "メールアドレスが存在しないか、パスワードが間違っています",
  });

  useEffect(() => {
    if (data) {
      localStorage("hanly_access_token", data.access_token);
      refreshMe();
      router.push("/friends");
    }
  }, [data]);

  const signIn = async ({ email, password }) => {
    const { client_id, client_secret } = await fetchClientCredentials();
    signWithToken({
      grant_type: "password",
      client_id,
      client_secret,
      scope: "*",
      username: email,
      password,
    });
  };

  return (
    <Layout>
      <Head>
        <title>ログイン | Hanly</title>
      </Head>
      <div className="wrap">
        <SignInForm
          isSending={fetchingCredentials || signingIn}
          onSubmit={signIn}
        />
        <Button href="/" className="mts" isTxt>
          戻る
        </Button>
        {error && <p className="error">{error}</p>}
      </div>
      <style jsx>
        {`
          .wrap {
            padding: 2.5rem 1rem 0;
          }
        `}
      </style>
    </Layout>
  );
}

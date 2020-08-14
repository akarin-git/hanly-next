import Head from "next/head";

import Layout from "components/Layout";
import Button from "components/Base/Button";
import SignUpForm from "components/SignUpForm";
import { useAppRouter, useAppAxiosExecute } from "hooks";

export default function SignUp() {
  const [router] = useAppRouter();
  const [{ loading, error }, signUp] = useAppAxiosExecute({
    method: "POST",
    url: "/api/signup",
    errorMessage: "登録済みのメールアドレスです",
  });

  const submit = async ({ nickname, email, password }) => {
    signUp({ nickname, email, password }).then(() => {
      router.push("/signin");
    });
  };

  return (
    <Layout>
      <Head>
        <title>新規登録 | Hanly</title>
      </Head>
      <div className="wrap">
        <SignUpForm isSending={loading} onSubmit={submit} />
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

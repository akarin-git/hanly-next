import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import Button from "components/Base/Button";
import SignInForm from "components/SignInForm";
import { useAppContext } from "hooks";

export default function SignUp() {
  const { axios } = useAppContext();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const signIn = async ({ email, password }) => {
    setIsSending(true);
    const {
      data: { client_id, client_secret },
    } = await axios.get("/api/oauth/client-credentials");

    try {
      const {
        data: { access_token },
      } = await axios.post("/api/oauth/token", {
        grant_type: "password",
        client_id,
        client_secret,
        scope: "*",
        username: email,
        password,
      });
      if (process.browser) {
        window.localStorage.setItem("hanly_access_token", access_token);
      }
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      router.push("/friends");
    } catch (e) {
      setIsSending(false);
      setError("メールアドレスが存在しないか、パスワードが間違っています");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <Layout>
      <div className="wrap">
        <SignInForm isSending={isSending} onSubmit={signIn} />
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

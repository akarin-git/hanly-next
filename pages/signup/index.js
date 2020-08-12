import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "components/Layout";
import Button from "components/Base/Button";
import SignUpForm from "components/SignUpForm";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const submit = async ({ nickname, email, password }) => {
    setIsSending(true);
    try {
      await axios.post("https://hanly.herokuapp.com/api/signup", {
        nickname,
        email,
        password,
      });
      router.push("/signin");
    } catch (e) {
      setIsSending(false);
      setError("登録済みのメールアドレスです");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
  };

  return (
    <Layout>
      <div className="wrap">
        <SignUpForm isSending={isSending} onSubmit={submit} />
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

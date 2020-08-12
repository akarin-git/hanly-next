import { useState } from "react";
import Input from "./Base/Input";
import Button from "./Base/Button";

function SignInForm({ isSending, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={submit}>
      <Input
        value={email}
        placeholder="メールアドレス"
        type="email"
        onChange={setEmail}
      />
      <Input
        value={password}
        placeholder="パスワード"
        type="password"
        onChange={setPassword}
      />
      <Button className="mts" disabled={isSending}>
        ログイン
      </Button>
    </form>
  );
}

export default SignInForm;

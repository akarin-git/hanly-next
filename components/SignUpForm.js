import { useState, useCallback } from "react";
import Input from "./Base/Input";
import Button from "./Base/Button";

function SignUpForm({ isSending, onSubmit }) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ nickname, email, password });
  };

  return (
    <form onSubmit={submit}>
      <Input
        value={nickname}
        placeholder="ニックネーム"
        onChange={setNickname}
      />
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
        新規登録
      </Button>
    </form>
  );
}

export default SignUpForm;

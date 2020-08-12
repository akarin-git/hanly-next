import { useState } from "react";
import Button from "./Button";
import styles from "../styles/SimpleForm.module.scss";

function SimpleForm({ initialValue, onSubmit }) {
  const [txt, setTxt] = useState(initialValue);

  const updateTxt = (e) => {
    setTxt(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(txt);
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        className={styles.input}
        value={txt}
        onChange={updateTxt}
      />
      <Button>送信</Button>
    </form>
  );
}

export default SimpleForm;

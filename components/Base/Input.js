import styles from "styles/Input.module.scss";

function Input({ value, type, placeholder, onChange }) {
  return (
    <input
      className={styles.input}
      type={type || "text"}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default React.memo(Input);

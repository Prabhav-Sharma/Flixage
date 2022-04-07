import React from "react";
import { useToggle } from "../../hooks";
import styles from "./TextInput.module.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

function TextInput({
  legend,
  value,
  onChange,
  placeholder,
  type,
  autoComplete,
  maxLength = Infinity,
}) {
  const { toggle: visible, setToggle: setVisible } = useToggle(false);

  const passwordIcon = visible ? (
    <AiOutlineEye
      onClick={() => setVisible((v) => !v)}
      className={styles.password_icon}
    />
  ) : (
    <AiOutlineEyeInvisible
      onClick={() => setVisible((v) => !v)}
      className={styles.password_icon}
    />
  );

  const input =
    type === "password" ? (
      <span className={styles.password_container}>
        <input
          className={`${styles.input} input-text`}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {passwordIcon}
      </span>
    ) : (
      <input
        value={value}
        onChange={onChange}
        className={`${styles.input} input-text`}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
      />
    );

  return (
    <fieldset>
      <legend>{legend}</legend>
      {input}
    </fieldset>
  );
}

export default TextInput;

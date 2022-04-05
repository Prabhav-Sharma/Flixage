import React from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { useAuthForm, useDocumentTitle, useToggle } from "../../hooks";
import { TextInput } from "../../components";
import { login, axiosRequest } from "../../services";
import { ImSpinner9 } from "react-icons/im";
import { useAuth } from "../../contexts/providers/AuthProvider";
import { EMAIL_REGEX } from "../../utils";

function Login() {
  const { authFormState: formState, authFormDispatch: formDispatch } =
    useAuthForm();

  const { authDispatch } = useAuth();

  const { toggle: loginToggle, setToggle: setLoginToggle } = useToggle(false);
  const { toggle: guestLoginToggle, setToggle: setGuestLoginToggle } =
    useToggle(false);

  const { email, password } = formState;

  const loginHandler = (e) => {
    e.preventDefault();

    if (password.length === 0) {
      alert("Fields can't be empty"); //Need to change to custom alert component
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      alert("Invalid email address");
      return;
    }

    login(
      {
        email,
        password,
      },
      setLoginToggle,
      authDispatch
    );
  };

  const guestLoginHandler = async (e) => {
    e.preventDefault();

    login(
      {
        email: "guest@gmail.com",
        password: "guest@gmail.com",
      },
      setGuestLoginToggle,
      authDispatch
    );
  };

  useDocumentTitle("Login | Flixage");

  return (
    <section className={`${styles.section} flex-col`}>
      <form className={`${styles.form} flex-col`}>
        <h1 className={styles.form_heading}>Login</h1>
        <TextInput
          type={"text"}
          placeholder={"John.doe@email.com"}
          legend={"Email"}
          value={email}
          onChange={(e) =>
            formDispatch({ type: "EMAIL", payload: { email: e.target.value } })
          }
          autoComplete={"email"}
        />

        <TextInput
          type={"password"}
          placeholder={"••••••••••"}
          legend={"Password"}
          value={password}
          onChange={(e) =>
            formDispatch({
              type: "PASSWORD",
              payload: { password: e.target.value },
            })
          }
          autoComplete={"current-password"}
        />
        <span className={`${styles.form_span} flex-row`}>
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a>Forgot Password?</a>
        </span>
        <button className="prim-btn" onClick={(e) => loginHandler(e)}>
          {loginToggle ? <ImSpinner9 className={styles.spinner} /> : "Login"}
        </button>
        <button className="prim-acc-btn" onClick={(e) => guestLoginHandler(e)}>
          {guestLoginToggle ? (
            <ImSpinner9 className={styles.spinner} />
          ) : (
            "Guest Login"
          )}
        </button>
        <Link to="/signup" className={styles.link}>
          Create New Account ❯
        </Link>
      </form>
    </section>
  );
}

export default Login;

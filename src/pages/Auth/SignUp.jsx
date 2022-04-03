import React from "react";
import styles from "./Auth.module.css";
import { TextInput } from "../../components";
import { Link } from "react-router-dom";
import { useAuthForm, useDocumentTitle } from "../../hooks";
import { signup } from "../../services/APICalls";
import { ImSpinner9 } from "react-icons/im";
import { useToggle } from "../../hooks";
import { useAuth } from "../../contexts/providers/AuthProvider";
import { EMAIL_REGEX } from "../../utils";

function SignUp() {
  const { authFormState: formState, authFormDispatch: formDispatch } =
    useAuthForm();

  const { fullName, password, confirmPassword, email, checkbox } = formState;

  const { toggle, setToggle } = useToggle();

  const { authDispatch } = useAuth();

  const signUpHandler = (e) => {
    e.preventDefault();

    if (fullName.length === 0 || password.length === 0) {
      alert("Fields can't be empty"); //Need to change to custom alert component
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      alert("Invalid email address");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!checkbox) {
      alert("Must agree to the terms of service in order to use the site");
      return;
    }

    signup(fullName, email, password, setToggle, authDispatch);
  };

  useDocumentTitle("Sign Up | Flixage");
  return (
    <section className={`${styles.section} flex-col`}>
      <form className={`${styles.form} flex-col`}>
        <h1 className={styles.form_heading}>Sign Up</h1>
        <TextInput
          type={"text"}
          placeholder={"John Doe"}
          legend={"Full Name"}
          value={fullName}
          onChange={(e) =>
            formDispatch({
              type: "FULL_NAME",
              payload: { fullName: e.target.value },
            })
          }
        />
        <TextInput
          type={"text"}
          placeholder={"John.doe@email.com"}
          legend={"Email"}
          value={email}
          onChange={(e) =>
            formDispatch({
              type: "EMAIL",
              payload: { email: e.target.value },
            })
          }
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
        />
        <TextInput
          type={"password"}
          placeholder={"••••••••••"}
          legend={"Confirm Password"}
          value={confirmPassword}
          onChange={(e) =>
            formDispatch({
              type: "CONFIRM_PASSWORD",
              payload: { confirmPassword: e.target.value },
            })
          }
        />
        <label>
          <input
            type="checkbox"
            value={checkbox}
            onChange={(e) =>
              formDispatch({
                type: "CHECKBOX",
              })
            }
          />
          I accept the terms of service
        </label>
        <button className="prim-btn" onClick={(e) => signUpHandler(e)}>
          {toggle ? <ImSpinner9 className={styles.spinner} /> : "Sign Up"}
        </button>
        <Link to="/login" className={styles.link}>
          Already have an account ❯
        </Link>
      </form>
    </section>
  );
}

export default SignUp;

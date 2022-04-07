import React from "react";
import styles from "./Auth.module.css";
import { TextInput } from "../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthForm, useDocumentTitle } from "../../hooks";
import { signup } from "../../services";
import { ImSpinner9 } from "react-icons/im";
import { useToggle } from "../../hooks";
import { useAuth } from "../../contexts/providers/AuthProvider";
import { EMAIL_REGEX } from "../../utils";
import { toast } from "react-toastify";

function SignUp() {
  const { authFormState: formState, authFormDispatch: formDispatch } =
    useAuthForm();

  const { fullName, password, confirmPassword, email, checkbox } = formState;

  const { toggle, setToggle } = useToggle();

  const { authDispatch } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();

    if (fullName.length === 0 || password.length === 0) {
      toast.info("Fields can't be empty");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      toast.info("Invalid email address");
      return;
    }

    if (password !== confirmPassword) {
      toast.info("Passwords don't match");
      return;
    }
    //Will add when Terms of service page is added
    // if (!checkbox) {
    //   alert("Must agree to the terms of service in order to use the site");
    //   return;
    // }

    await signup(
      { userName: fullName, email, password },
      setToggle,
      authDispatch
    );
    const pathName = location?.state?.from?.pathname;
    navigate(pathName ? pathName : "/");
  };

  useDocumentTitle("Sign Up | Flixage");
  return (
    <section className={`${styles.section} flex-col`}>
      <form className={`${styles.form} flex-col`}>
        <h1 className={styles.form_heading}>Sign Up</h1>
        <TextInput
          type="text"
          placeholder="John Doe"
          legend="Full Name"
          value={fullName}
          onChange={(e) =>
            formDispatch({
              type: "FULL_NAME",
              payload: { fullName: e.target.value },
            })
          }
          autoComplete="name"
        />
        <TextInput
          type="text"
          placeholder="John.doe@email.com"
          legend="Email"
          value={email}
          onChange={(e) =>
            formDispatch({
              type: "EMAIL",
              payload: { email: e.target.value },
            })
          }
          autoComplete="email"
        />
        <TextInput
          type="password"
          placeholder="••••••••••"
          legend="Password"
          value={password}
          onChange={(e) =>
            formDispatch({
              type: "PASSWORD",
              payload: { password: e.target.value },
            })
          }
          autoComplete="new-password"
        />
        <TextInput
          type="password"
          placeholder="••••••••••"
          legend="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            formDispatch({
              type: "CONFIRM_PASSWORD",
              payload: { confirmPassword: e.target.value },
            })
          }
          autoComplete="new-password"
        />
        {/* Only for display, will make it functioning when Terms of service page
        is added */}
        <label>
          <input
            type="checkbox"
            value={checkbox}
            onChange={() =>
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

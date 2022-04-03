import React, { useReducer } from "react";
import authFormReducer from "./authFormReducer";

function useAuthForm() {
  const [authFormState, authFormDispatch] = useReducer(authFormReducer, {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkbox: false,
  });

  return { authFormState, authFormDispatch };
}

export default useAuthForm;

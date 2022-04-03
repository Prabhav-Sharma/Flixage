const authFormReducer = (state, action) => {
  switch (action.type) {
    case "FULL_NAME":
      return { ...state, fullName: action.payload.fullName };

    case "EMAIL":
      return { ...state, email: action.payload.email };

    case "PASSWORD":
      return { ...state, password: action.payload.password };

    case "CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload.confirmPassword };

    case "CHECKBOX":
      return { ...state, checkbox: !state.checkbox };

    default:
      throw new Error(action.type);
  }
};

export default authFormReducer;

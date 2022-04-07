const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload.user, isAuthenticated: true };

    case "SIGN_UP":
      return { ...state, user: action.payload.user, isAuthenticated: true };

    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, user: {}, token: "" };

    default:
      return state;
  }
};

export default authReducer;

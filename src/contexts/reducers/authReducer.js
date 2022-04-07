const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };

    case "SIGN_UP":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, user: {}, token: null };

    default:
      return state;
  }
};

export default authReducer;

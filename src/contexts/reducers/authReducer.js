import { LOGIN_ACTION, SIGNUP_ACTION, LOGOUT_ACTION } from "../../utils";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };

    case SIGNUP_ACTION:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };

    case LOGOUT_ACTION:
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, user: {}, token: null };

    default:
      return state;
  }
};

export default authReducer;

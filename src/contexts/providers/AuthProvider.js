import { useContext, createContext, useReducer } from "react";
import authReducer from "../reducers/authReducer";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {
    user: {},
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
  });

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

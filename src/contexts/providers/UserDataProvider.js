import { useContext, createContext, useReducer } from "react";
import { userDataReducer } from "../reducers/userDataReducer";

const UserDataContext = createContext(null);

const UserDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userDataReducer, {
    history: [],
    watchlater: [],
    playlists: [],
    likes: [],
  });

  return (
    <UserDataContext.Provider value={{ state, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
};

const useUserData = () => useContext(UserDataContext);

export { UserDataProvider, useUserData };

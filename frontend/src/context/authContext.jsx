import { createContext, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authApi = "http://localhost:8080/api/auth";
  const uploadApi = "http://localhost:8080/api/upload";
  const [user, setUser] = useState();
  const [loggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${authApi}/check-auth`);
      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    user,
    setUser,
    authApi,
    uploadApi,
    loggedIn,
    setIsLoggedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

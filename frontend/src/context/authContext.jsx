import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const authApi = "https://pixvault-d9yp.onrender.com/api/auth";
  const uploadApi = "https://pixvault-d9yp.onrender.com/api/upload";
  const contactApi = "https://pixvault-d9yp.onrender.com/api/contact";
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${authApi}/check-auth`);
      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isLoggedIn]);

  const value = {
    user,
    setUser,
    authApi,
    uploadApi,
    isLoggedIn,
    setIsLoggedIn,
    contactApi,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

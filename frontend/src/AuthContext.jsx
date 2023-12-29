import React, { createContext, useContext, useState } from "react";
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => JSON.parse(localStorage.getItem("userToken")) || null
  );

  const setUserToken = (token) => {
    localStorage.setItem("userToken", JSON.stringify(token));
    setToken(token);
  };

  const removeUserToken = () => {
    localStorage.removeItem("userToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth: !!token, setUserToken, removeUserToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);

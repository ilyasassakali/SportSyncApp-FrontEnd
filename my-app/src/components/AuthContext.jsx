import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext({
  isUserLoggedIn: false,
  userData: null,
  setUserData: () => {},
  savePushToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userDataString = await SecureStore.getItemAsync("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;
      setIsUserLoggedIn(userData !== null);
      setUserData(userData);
    };
    checkLoginStatus();
  }, []);

  const savePushToken = async (userId, pushToken) => {
    try {
      await fetch(
        "https://sportsyncapp-backend.onrender.com/users/save-push-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, pushToken }),
        }
      );
    } catch (error) {
      console.error("Failed to save push token:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        userData,
        setUserData,
        savePushToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

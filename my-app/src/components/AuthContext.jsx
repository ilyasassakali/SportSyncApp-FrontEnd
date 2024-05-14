import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext({
    isUserLoggedIn: false,
    userData: null, 
    setUserData: () => {} 
});

export const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userDataString = await SecureStore.getItemAsync('userData');
            const userData = userDataString ? JSON.parse(userDataString) : null;
            setIsUserLoggedIn(userData !== null);
            setUserData(userData);
        };
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, userData, setUserData  }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

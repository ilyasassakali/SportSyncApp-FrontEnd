import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext({ isUserLoggedIn: false });

export const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userData = await SecureStore.getItemAsync('userData');
            setIsUserLoggedIn(userData !== null);
        };
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

import React, {createContext, ReactNode, useContext, useState} from "react";
import {AuthResponse} from "../types/Auth.ts";

type AuthContextType = {
    user: AuthResponse | null;
    credentials: string | null;
    login: (username: string, password: string, userData: AuthResponse) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [credentials, setCredentials] = useState<string | null>(null);
    const [user, setUser] = useState<AuthResponse | null>(null);

    const login = (username: string, password: string, userData: AuthResponse) => {
        const encodedCredentials = btoa(`${username}:${password}`);
        setCredentials(encodedCredentials);
        setUser(userData);
    };

    const logout = () => {
        setCredentials(null);
        setUser(null);
    };

    const isAuthenticated = !!credentials;

    return (
        <AuthContext.Provider value={{credentials, login, logout, isAuthenticated, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
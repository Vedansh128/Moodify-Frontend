import { createContext, useState, useEffect } from "react";
import {
    login,
    register,
    logout,
    getMe,
} from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        try {
            const user = await getMe();
            setUser(user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin(values) {

        setLoading(true);

        try {
            const data = await login(values);
            setUser(data.user);
            return data;
        } finally {
            setLoading(false);
        }
    }

    async function handleRegister(values) {

        setLoading(true);

        try {
            const data = await register(values);
            setUser(data.user);
            return data;
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {

        setLoading(true);

        try {
            await logout();
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                handleLogin,
                handleRegister,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
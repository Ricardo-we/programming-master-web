import { useContext, useState, useEffect, createContext } from "react";
import Router from "next/router";

import { useJsonStorage } from "../hooks/useLocalStorage";
import { toast, ToastContainer } from "react-toastify";

const AuthContext = createContext({});
const storagePrefix = "programming-master-";

function AuthProvider({ children }) {
    const [user, setUser] = useJsonStorage(storagePrefix + "user")

    useEffect(() => {
        if (user?.token && Router.pathname === "/login" || Router.pathname === "/login/sign-up") {
            Router.push("/guides");
            toast.success("Logged in successfully")
        }
    }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export {
    AuthContext,
    AuthProvider,
    useAuth
}
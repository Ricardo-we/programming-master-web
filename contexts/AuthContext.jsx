import { useContext, useState, useEffect, createContext } from "react";

import { jsonStorage } from "../utils/storage-utils";

const AuthContext = createContext({});
const storagePrefix = "programming-master-";

function AuthProvider({ children }) {
    const storedUser = jsonStorage(storagePrefix + "user");
    const [user, setUser] = useState(storedUser.getItem());

    useEffect(() => {
        if (user) {
            storedUser.setItem(user);
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
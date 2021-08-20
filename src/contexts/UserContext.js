import {createContext, useContext, useEffect, useState} from "react";
import {auth} from '../firebase'

export const UserContext = createContext(null);

export function useAuth() {
    return useContext(UserContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(false)
    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    const logout = () => {
        return auth.signOut()
    }
    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }
    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
    }, []);
    const value = {
        currentUser,
        signUp,
        logout,
        login,
        resetPassword
    };
    return <UserContext.Provider value={value}>
        {!loading && children}
    </UserContext.Provider>
}
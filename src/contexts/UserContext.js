import {createContext, useContext, useEffect, useState} from "react";
import {auth, db} from '../firebase'
import firebase from "firebase";

export const UserContext = createContext(null);

export function useAuth() {
    return useContext(UserContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(false)
    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    const addProfile = (data) => {
        setProfile(data);
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
            if(user) {
                db.collection('users').where('uid', '==', user.uid).onSnapshot(querySnapShot => {
                    querySnapShot.docs.map(x => setProfile(x.data()))
                })
            }
        })
    }, []);
    const value = {
        currentUser, profile,
        signUp, addProfile,
        logout,
        login,
        resetPassword
    };
    return <UserContext.Provider value={value}>
        {!loading && children}
    </UserContext.Provider>
}
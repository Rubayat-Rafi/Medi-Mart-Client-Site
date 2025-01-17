import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { app } from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null)

const auth = getAuth(app)


const AuthProvider = ({children}) => {

const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)


//create a new user 
const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
}

//update signUp user 
const updateUser =(username, image)=> {
    setLoading(true)
    return updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: image,
    })
}

// sign in user 
const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}


// onauthstatechange
useEffect(()=>{
    const subscribe = onAuthStateChanged(auth, (currentUser=>{
        setUser(currentUser)
        setLoading(false)
    }))

    return ()=> {
        subscribe();
    }

},[])




    const authData = {
        createUser,
        user,
        setUser,
        loading,
        signInUser,
        updateUser,
    }

    console.log(user)

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    )
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
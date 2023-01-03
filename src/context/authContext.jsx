import { createContext, useContext, useState, useEffect } from "react";
//importing firebase
import { auth , db } from "../firebase";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword ,
    signOut,
    onAuthStateChanged
    } from "firebase/auth";

import {setDoc,doc} from 'firebase/firestore'


const AuthContext = createContext() ;

export const AuthProvider = ({children}) =>{
    //[1] intilize state
    const [user,setUser] = useState({}) ;

    //[2]handlerfunction for sing in , up , log out
  
    function signUpHandler(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, 'users', email), {
            savedMovies: []
        })
      }
    
    function signInHandler(email,pass){
        return signInWithEmailAndPassword(auth,email,pass)
    }

    function logOutHandler(){
        return signOut(auth);
    }
    
    //[4] follow user caase
    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
        } )
        return () => unSubscribe() ;
    } )

    return (
        //[3] insert functions and state will be shared
        <AuthContext.Provider value={{user,signUpHandler , signInHandler, logOutHandler}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUserAuth = () => useContext(AuthContext)
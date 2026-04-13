import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";
import { useState } from "react";
import { useEffect } from "react";

const googleAuthProvider= new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user,setUser]= useState(null);
  const [loading, setLoading]= useState(true)



  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser=(email,password)=>{
     setLoading(true);
    return signInWithEmailAndPassword(auth,email,password)
  };

const googleSignin=()=>{
   setLoading(true);
  return signInWithPopup(auth, googleAuthProvider)
}

const logOut=()=>{
  setLoading(true);
  return signOut(auth)
}

const updateUserProfile=(profile)=>{
  return updateProfile(auth.currentUser, profile)
}

useEffect(()=>{
  const unsubscribe= onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser)
    
    setLoading(false)
  })
  return ()=>{unsubscribe()}
},[])

  const authInfo = {
    registerUser, signInUser, googleSignin, user, loading, logOut,updateUserProfile
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;

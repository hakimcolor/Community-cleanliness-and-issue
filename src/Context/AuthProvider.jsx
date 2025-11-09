import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.confige';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = (
    emailValue,
    passwordValue,
    imgUrlValue,
    firstNameValue
  ) => {
    return createUserWithEmailAndPassword(
      auth,
      emailValue,
      passwordValue,
      imgUrlValue,
      firstNameValue
    );
  };

  const singinuser = (email, passcode) => {
    return signInWithEmailAndPassword(auth, email, passcode);
  };

  const singout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log('Current user:', currentUser);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUser,
    singinuser,
    singout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

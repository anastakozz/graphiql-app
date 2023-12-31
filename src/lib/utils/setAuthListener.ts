import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import React from 'react';

interface IAuthListener {
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  setHasCheckedAuth?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function setAuthListener({ setIsUserLoggedIn, setHasCheckedAuth }: IAuthListener) {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setIsUserLoggedIn(!!user);
    setHasCheckedAuth && setHasCheckedAuth(true);
  });

  return () => {
    unsubscribe();
  };
}

import { Navigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { setAuthListener } from '../lib';

interface Props {
  children: ReactNode;
  isAuthPath: boolean;
}

export const ProtectedRoute = ({ children, isAuthPath }: Props) => {
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => setAuthListener({ setIsUserLoggedIn, setHasCheckedAuth }), []);
  if (!hasCheckedAuth) return null;

  if (isAuthPath) {
    return isUserLoggedIn ? <Navigate to="/main" replace /> : <>{children}</>;
  } else {
    return isUserLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
  }
};

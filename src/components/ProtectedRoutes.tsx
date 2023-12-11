import { Navigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { setAuthListener } from '../lib';

interface Props {
  children: ReactNode;
}

export const ProtectedMainPageRoute = ({ children }: Props) => {
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => setAuthListener({ setIsUserLoggedIn, setHasCheckedAuth }), []);

  if (!hasCheckedAuth) return null;
  return isUserLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
};

export const ProtectedAuthPagesRoute = ({ children }: Props) => {
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => setAuthListener({ setIsUserLoggedIn, setHasCheckedAuth }), []);

  if (!hasCheckedAuth) return null;
  return isUserLoggedIn ? <Navigate to="/main" replace /> : <>{children}</>;
};

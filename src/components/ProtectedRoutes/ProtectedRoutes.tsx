import { Navigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { setAuthListener } from '../../lib';
import { Props } from './protectedRoutes.types';

export const ProtectedRoute: FC<Props> = ({ children, isAuthPath }) => {
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => setAuthListener({ setIsUserLoggedIn, setHasCheckedAuth }), []);

  if (!hasCheckedAuth) return null;

  if (isAuthPath) {
    return isUserLoggedIn ? <Navigate to="/main" replace /> : <>{children}</>;
  }

  return isUserLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
};

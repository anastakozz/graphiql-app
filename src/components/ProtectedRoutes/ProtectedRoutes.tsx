import { useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { setAuthListener } from '../../lib';
import { Props } from './protectedRoutes.types';

export const ProtectedRoute: FC<Props> = ({ children, isAuthPath }) => {
  const navigate = useNavigate();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => setAuthListener({ setIsUserLoggedIn, setHasCheckedAuth }), []);

  if (!hasCheckedAuth) return null;

  if (isAuthPath) {
    if (isUserLoggedIn) {
      navigate('/main');
    }
    return <>{children}</>;
  }

  if (isUserLoggedIn) {
    return <>{children}</>;
  }
  navigate('/');
};

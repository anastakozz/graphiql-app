import { Navigate } from 'react-router-dom';
import { ReactNode, useContext } from 'react';
import userContext from '../lib/context';

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isUserLoggedIn } = useContext(userContext);
  if (!isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

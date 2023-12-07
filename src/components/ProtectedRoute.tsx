import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface Props {
  userIsLoggedIn: boolean;
  children: ReactNode;
}

const ProtectedRoute = ({ userIsLoggedIn, children }: Props) => {
  if (!userIsLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

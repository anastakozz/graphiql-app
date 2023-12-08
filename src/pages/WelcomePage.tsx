import { useContext } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../lib/context';

export default function WelcomePage() {
  const { isUserLoggedIn } = useContext(userContext);

  return (
    <>
      <h1>Welcome!</h1>
      {!isUserLoggedIn ? (
        <>
          <Link to="sign-in">sign in </Link>
          <Link to="sign-up"> sign up</Link>{' '}
        </>
      ) : (
        <Link to="main">to main Page</Link>
      )}
    </>
  );
}

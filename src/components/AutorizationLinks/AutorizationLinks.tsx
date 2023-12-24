import { useContext, useEffect, useState } from 'react';
import { setAuthListener, userContext } from '../../lib';
import { Link } from 'react-router-dom';

export default function AutorizationLinks() {
  const dictionary = useContext(userContext).localData?.welcomePage;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => setAuthListener({ setIsUserLoggedIn }), []);

  return (
    dictionary && (
      <div className="sign-links-container text-center">
        {isUserLoggedIn ? (
          <Link className="link-button link-button__empty " to="/main">
            <p>{dictionary.toMain}</p>
          </Link>
        ) : (
          <>
            <Link className="link-button link-button__empty " to="/sign-in">
              <p>{dictionary.signIn}</p>
            </Link>

            <Link className="link-button link-button__empty" to="/sign-up">
              <p>{dictionary.signUp}</p>
            </Link>
          </>
        )}
      </div>
    )
  );
}

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../lib';

export default function NotFoundPage() {
  const dictionary = useContext(userContext).localData?.notFoundPage;

  return (
    dictionary && (
      <div className="not-found-page">
        <h1 className="main-title not-found-title text-center">404</h1>
        <h2 className="not-found-subtitle">{dictionary.message}</h2>
        <Link className="link-button link-button__filled" to="/">
          <p>{dictionary.buttonText}</p>
        </Link>
      </div>
    )
  );
}

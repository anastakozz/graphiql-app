import { useContext } from 'react';
import { userContext } from '../lib';
import { Link } from 'react-router-dom';
import { Button } from '../components';
import wrongImage from '../assets/wrong-icon.png';

export default function ErrorPage() {
  const dictionary = useContext(userContext).localData?.errorPage;

  const handleClick = () => {
    window.location.reload();
  };

  return (
    dictionary && (
      <div className="error-page main-inner">
        <img src={wrongImage} alt="" />
        <h2 className="not-found-subtitle">{dictionary.message}</h2>
        <Link to="/">
          <Button onClick={handleClick}>{dictionary.buttonText}</Button>
        </Link>
      </div>
    )
  );
}

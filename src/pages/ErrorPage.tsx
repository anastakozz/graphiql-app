import { useContext, useEffect, useState } from 'react';
import { pageData } from '../lib/commonTypes/interfaces';
import { userContext } from '../lib';
import { Link } from 'react-router-dom';
import { Button } from '../components';
import wrongImage from '../assets/wrong-icon.png';

export default function ErrorPage() {
  const { localData } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);

  const handleClick = () => {
    window.location.reload();
  };
  useEffect(() => {
    if (localData) {
      const data = localData['errorPage'];
      setData(data);
    }
  }, [localData]);
  return (
    data && (
      <div className="error-page main-inner">
        <img src={wrongImage} alt="" />
        <h2 className="not-found-subtitle">{data.message}</h2>
        <Link to="/">
          <Button onClick={handleClick}>{data.buttonText}</Button>
        </Link>
      </div>
    )
  );
}

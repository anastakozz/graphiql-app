import { Link } from 'react-router-dom';
import { Button } from '../components';
import { useContext, useEffect, useState } from 'react';
import { pageData } from '../lib/commonTypes/interfaces';
import { userContext } from '../lib';

export default function NotFoundPage() {
  const { localData } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);
  useEffect(() => {
    if (localData) {
      const data = localData['notFoundPage'];
      setData(data);
    }
  }, [localData]);
  return (
    data && (
      <div className="not-found-page">
        <h1 className="main-title not-found-title text-center">404</h1>
        <h2 className="not-found-subtitle">{data.message}</h2>
        <Link to="/">
          <Button>{data.buttonText}</Button>
        </Link>
      </div>
    )
  );
}

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../lib/context';
import { pageData } from '../lib/interface';

export default function WelcomePage() {
  const { isUserLoggedIn, localData } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);

  useEffect(() => {
    if (localData) {
      const data = localData['welcomePage'];
      setData(data);
    }
  }, [localData]);

  return (
    <>
      {data && (
        <>
          <h1>{data.title}</h1>
          {!isUserLoggedIn ? (
            <>
              <Link to="sign-in">{data.signIn}</Link>
              <Link to="sign-up">{data.signUp}</Link>
            </>
          ) : (
            <Link to="main">{data.toMain}</Link>
          )}
        </>
      )}
    </>
  );
}

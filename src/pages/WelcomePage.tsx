import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../lib/context';
import { LocalizationData } from '../lib/interfaces';
import { getJSON } from '../lib/utils';

export default function WelcomePage() {
  const { isUserLoggedIn, language } = useContext(userContext);
  const [data, setData] = useState<LocalizationData | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getJSON(language, 'welcomePage');
      console.log(data);
      setData(data);
    };

    getData();
  }, [language]);

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
            <Link to="main">{data.toMainPage}</Link>
          )}
        </>
      )}
    </>
  );
}

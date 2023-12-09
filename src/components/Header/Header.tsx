import { Link, useNavigate } from 'react-router-dom';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { useContext, useEffect, useState } from 'react';
import { getJSON } from '../../lib/utils';
import userContext from '../../lib/context';
import { LocalizationData } from '../../lib/interface';
import Button from '../Button/Button';

export default function Header() {
  const { isUserLoggedIn, language, setIsUSerLoggedIn } = useContext(userContext);
  const [data, setData] = useState<LocalizationData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await getJSON(language, 'header');
      console.log(data);
      setData(data);
    };

    getData();
  }, [language]);

  const handleSignOut = () => {
    setIsUSerLoggedIn && setIsUSerLoggedIn(false);
    navigate('/sign-in');
  };

  return (
    data && (
      <header className="header">
        <Link className="logo-link" to="/">
          GraphiQL | Welcome page
        </Link>
        <div className="header-right-part">
          <LanguageSelect />
          {!isUserLoggedIn && (
            <Button className="logout-button" onClick={handleSignOut}>
              {data.signOut}
            </Button>
          )}
        </div>
      </header>
    )
  );
}

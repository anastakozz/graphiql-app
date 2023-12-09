import { Link, useNavigate } from 'react-router-dom';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';
import { pageData } from '../../lib/interface';
import Button from '../Button/Button';

export default function Header() {
  const { isUserLoggedIn, localData, setIsUSerLoggedIn } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localData) {
      const data = localData['header'];
      setData(data);
    }
  }, [localData]);

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
          {isUserLoggedIn && (
            <Button className="logout-button" onClick={handleSignOut}>
              {data.signOut}
            </Button>
          )}
        </div>
      </header>
    )
  );
}

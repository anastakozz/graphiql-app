import { Link, useNavigate } from 'react-router-dom';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';
import { pageData } from '../../lib/interfaces';
import Button from '../Button/Button';

export default function Header() {
  const { isUserLoggedIn, localData, setIsUSerLoggedIn } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleScroll = () => {
    setScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      <header className={`header ${scrolled ? 'header-scroll' : ''}`}>
        <Link className="logo-link" to="/">
          {data.welcomePage}
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

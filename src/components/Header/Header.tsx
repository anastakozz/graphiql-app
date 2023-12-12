import { Link, useNavigate } from 'react-router-dom';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { useContext, useEffect, useState } from 'react';
import { pageData } from '../../lib/commonTypes/interfaces';
import Button from '../Button/Button';
import { setAuthListener, auth, userContext } from '../../lib';
import { signOut } from 'firebase/auth';

export default function Header() {
  const { localData } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => setAuthListener({ setIsUserLoggedIn }), []);
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsUserLoggedIn(false);
      navigate('/sign-in');
    } catch (e) {
      console.error(e);
    }
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

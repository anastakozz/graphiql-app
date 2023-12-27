import { Link, useNavigate } from 'react-router-dom';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import { setAuthListener, auth, userContext } from '../../lib';
import { signOut } from 'firebase/auth';

export default function Header() {
  const dictionary = useContext(userContext).localData?.header;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleScroll = () => {
    setScrolled(window.scrollY > 0);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsUserLoggedIn(false);
      navigate('/sign-in');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => setAuthListener({ setIsUserLoggedIn }), []);

  return (
    dictionary && (
      <header data-testid="header" className={`header ${scrolled ? 'header-scroll' : ''}`}>
        <Link className="logo-link" to="/">
          {dictionary.welcomePage}
        </Link>
        <div className="header-right-part">
          <LanguageSelect />
          {isUserLoggedIn && (
            <Button className="logout-button" onClick={handleSignOut}>
              {dictionary.signOut}
            </Button>
          )}
        </div>
      </header>
    )
  );
}

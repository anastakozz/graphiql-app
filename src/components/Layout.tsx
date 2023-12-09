import { useState } from 'react';
import { Header, Footer } from './';
import { Language } from '../lib/enum';
import userContext from '../lib/context';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [isUserLoggedIn, setIsUSerLoggedIn] = useState(true);
  const [language, setLanguage] = useState(Language.en);
  return (
    <userContext.Provider value={{ isUserLoggedIn, setIsUSerLoggedIn, language, setLanguage }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </userContext.Provider>
  );
}

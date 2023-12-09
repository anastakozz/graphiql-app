import { ReactNode, useState } from 'react';
import { Header, Footer } from './';
import { Language } from '../lib/enum';
import userContext from '../lib/context';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [isUserLoggedIn, setIsUSerLoggedIn] = useState(false);
  const [language, setLanguage] = useState(Language.en);
  return (
    <>
      <userContext.Provider value={{ isUserLoggedIn, setIsUSerLoggedIn, language, setLanguage }}>
        {/* <Header /> */}
        <main>{children}</main>
        <Footer />
      </userContext.Provider>
    </>
  );
}

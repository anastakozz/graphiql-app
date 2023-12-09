import { useEffect, useState } from 'react';
import { Header, Footer } from './';
import { Language } from '../lib/enum';
import userContext from '../lib/context';
import { Outlet } from 'react-router-dom';
import { getJSON } from '../lib/utils';

export default function Layout() {
  const [isUserLoggedIn, setIsUSerLoggedIn] = useState(false);
  const [localData, setLocalData] = useState();

  useEffect(() => {
    const getData = async () => {
      changeLocalData(Language.en);
    };
    getData();
  }, []);

  const changeLocalData = async (language: string) => {
    const data = await getJSON(language);

    if (data) {
      setLocalData(data);
    }
  };

  return (
    <userContext.Provider value={{ isUserLoggedIn, setIsUSerLoggedIn, localData, changeLocalData }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </userContext.Provider>
  );
}

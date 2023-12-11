import { useEffect, useState } from 'react';
import { Header, Footer } from './';
import { Language, getJSON, userContext } from '../lib';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [localData, setLocalData] = useState();

  useEffect(() => {
    const getData = async () => {
      await changeLocalData(Language.en);
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
    <userContext.Provider value={{ localData, changeLocalData }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </userContext.Provider>
  );
}

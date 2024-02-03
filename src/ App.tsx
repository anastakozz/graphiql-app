import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { ErrorPage } from './pages';
import router from './lib/router';
import store from './store';
import { Provider } from 'react-redux';
import { Language, getJSON, userContext } from './lib';
import { useEffect, useState } from 'react';

export default function App() {
  const [localData, setLocalData] = useState(null);

  const changeLocalData = async (language: string) => {
    const data = await getJSON(language);

    if (data) {
      setLocalData(data);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await changeLocalData(Language.en);
    };
    getData();
  }, []);

  return (
    <userContext.Provider value={{ localData, changeLocalData }}>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ErrorBoundary>
    </userContext.Provider>
  );
}

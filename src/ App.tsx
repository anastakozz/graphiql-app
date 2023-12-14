import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { ErrorPage } from './pages';
import { router } from './lib';
import store from './store';
import { Provider } from 'react-redux';
import { Language, getJSON, userContext } from './lib';
import { useEffect, useState } from 'react';

export default function App() {
  const [localData, setLocalData] = useState(null);

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
      <ErrorBoundary fallback={<ErrorPage />}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ErrorBoundary>
    </userContext.Provider>
  );
}

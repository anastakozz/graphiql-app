import ReactDOM from 'react-dom/client';
import './sass/main.scss';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { ErrorPage } from './pages';
import router from './lib/router.tsx';
import { Provider } from 'react-redux';
import store from './store/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<ErrorPage />}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ErrorBoundary>
);

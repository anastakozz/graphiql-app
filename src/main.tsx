import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { ErrorPage } from './pages';
import router from './lib/router.tsx';
import Layout from './components/Layout.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<ErrorPage />}>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </ErrorBoundary>
);

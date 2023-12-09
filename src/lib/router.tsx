import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { WelcomePage, MainPage, NotFoundPage, SignInPage, SignUpPage } from '../pages';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<WelcomePage />} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route
        path="main"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;

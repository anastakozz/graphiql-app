import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { WelcomePage, MainPage, NotFoundPage, SignInPage, SignUpPage } from '../pages';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<WelcomePage />} />
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
    </>
  )
);

export default router;

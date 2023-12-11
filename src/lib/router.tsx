import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { WelcomePage, MainPage, NotFoundPage, SignInPage, SignUpPage } from '../pages';
import { ProtectedRoute } from '../components/ProtectedRoutes';
import Layout from '../components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route
          path="sign-in"
          element={
            <ProtectedRoute isAuthPath={true}>
              <SignInPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="sign-up"
          element={
            <ProtectedRoute isAuthPath={true}>
              <SignUpPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="main"
          element={
            <ProtectedRoute isAuthPath={false}>
              <MainPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default router;

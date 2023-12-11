import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { WelcomePage, MainPage, NotFoundPage, SignInPage, SignUpPage } from '../pages';
import { ProtectedAuthPagesRoute, ProtectedMainPageRoute } from '../components/ProtectedRoutes';
import Layout from '../components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route
          path="sign-in"
          element={
            <ProtectedAuthPagesRoute>
              <SignInPage />
            </ProtectedAuthPagesRoute>
          }
        />
        <Route
          path="sign-up"
          element={
            <ProtectedAuthPagesRoute>
              <SignUpPage />
            </ProtectedAuthPagesRoute>
          }
        />
        <Route
          path="main"
          element={
            <ProtectedMainPageRoute>
              <MainPage />
            </ProtectedMainPageRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default router;

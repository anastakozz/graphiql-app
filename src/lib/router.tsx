import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';
import AuthentificationPage from '../pages/AuthentificationPage';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<WelcomePage />} />
      <Route path="auth" element={<AuthentificationPage />}></Route>
      <Route
        path="main"
        element={
          <ProtectedRoute userIsLoggedIn={true}>
            <MainPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default router;

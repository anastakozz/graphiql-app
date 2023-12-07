import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <>
      <h1>Welcome!</h1>
      <Link to="auth">sign in/up or main</Link>
    </>
  );
}

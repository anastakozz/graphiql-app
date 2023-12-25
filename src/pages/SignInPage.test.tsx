import { render, screen, fireEvent } from '@testing-library/react';
import SignInPage from './SignInPage';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import userContext, { ContextProps } from '../lib/context';
import en from '../localization/en.json';

const customRender = (
  ui: ReactNode,
  { providerProps, ...renderOptions }: { providerProps: { value: ContextProps } }
) => {
  return render(
    <BrowserRouter>
      <userContext.Provider {...providerProps}>{ui}</userContext.Provider>
    </BrowserRouter>,
    renderOptions
  );
};

describe('SignInPage component', () => {
  const mockContext = {
    localData: {
      ...en,
      signInPage: {
        signInTitle: 'Sign In',
        account: "Don't have an account? Sign up",
        error: 'Invalid credentials',
      },
    },
    changeLocalData: vi.fn(),
  };
  it('renders SignInPage with correct form elements', () => {
    customRender(<SignInPage />, { providerProps: { value: mockContext } });

    const signInPage = screen.getByRole('sign-in-page');
    expect(signInPage).toBeInTheDocument();

    const signInTitle = screen.getByRole('heading', { name: 'Sign In' });
    expect(signInTitle).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/E-mail/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    expect(signInButton).toBeInTheDocument();

    const signUpLink = screen.getByRole('link', { name: /Don't have an account/i });
    expect(signUpLink).toBeInTheDocument();
  });

  it('clicking the link navigates to the Sign Up page', () => {
    customRender(<SignInPage />, { providerProps: { value: mockContext } });

    const signInPage = screen.getByRole('sign-in-page');
    expect(signInPage).toBeInTheDocument();

    const signUpLink = screen.getByRole('link', { name: /Don't have an account/i });
    fireEvent.click(signUpLink);

    expect(window.location.pathname).toBe('/sign-up');
  });
});

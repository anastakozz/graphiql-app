import { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SignUpPage from './SignUpPage';
import { BrowserRouter } from 'react-router-dom';
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

describe('SignUpPage component', () => {
  const mockContext = {
    localData: {
      ...en,
      signUpPage: {
        signUpTitle: 'Sign Up',
        account: 'Already have an account? Sign in',
      },
    },
    changeLocalData: vi.fn(),
  };

  it('renders SignUpPage with correct form elements', () => {
    customRender(<SignUpPage />, { providerProps: { value: mockContext } });

    const signUpPage = screen.getByRole('sign-up-page');
    expect(signUpPage).toBeInTheDocument();

    const signUpTitle = screen.getByRole('heading', { name: 'Sign Up' });
    expect(signUpTitle).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/E-mail/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getAllByLabelText(/Password:/i)[0];
    expect(passwordInput).toBeInTheDocument();

    const confirmPasswordInput = screen.getByLabelText(/Confirm password:/i);
    expect(confirmPasswordInput).toBeInTheDocument();

    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
    expect(signUpButton).toBeInTheDocument();

    const signInLink = screen.getByRole('link', { name: /Already have/i });
    expect(signInLink).toBeInTheDocument();
  });
  it('clicking the link navigates to the Sign In page', () => {
    customRender(<SignUpPage />, { providerProps: { value: mockContext } });

    const signUpPage = screen.getByRole('sign-up-page');
    expect(signUpPage).toBeInTheDocument();

    const signInLink = screen.getByRole('link', { name: /Already have/i });
    fireEvent.click(signInLink);

    expect(window.location.pathname).toBe('/sign-in');
  });
});

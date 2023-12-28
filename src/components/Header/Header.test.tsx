import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';
import userContext, { ContextProps } from '../../lib/context';
import { ReactNode } from 'react';
import en from '../../localization/en.json';
import { BrowserRouter } from 'react-router-dom';

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

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Header component', () => {
  const mockContext = {
    localData: {
      ...en,
      header: {
        welcomePage: 'Welcome',
        signOut: 'Sign Out',
      },
    },
    changeLocalData: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    customRender(<Header />, { providerProps: { value: mockContext } });
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  it('renders link to welcome page', () => {
    customRender(<Header />, { providerProps: { value: mockContext } });
    const link = screen.getByRole('link', { name: /Welcome/i });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(link).toHaveBeenCalled;
  });

  it('renders LanguageSelect component', () => {
    customRender(<Header />, { providerProps: { value: mockContext } });

    expect(screen.getByTestId('language-select')).toBeInTheDocument();
  });

  it('changes header style on scroll', async () => {
    customRender(<Header />, { providerProps: { value: mockContext } });

    expect(screen.getByTestId('header')).not.toHaveClass('header-scroll');

    window.scrollY = 50;
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getByTestId('header')).toHaveClass('header-scroll');
    });
  });
});

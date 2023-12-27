import { screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { act } from 'react-dom/test-utils';
import en from '../../localization/en.json';
import { customRender } from '../../lib/utils/testUtils';

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

    expect(screen.getByRole('language-select')).toBeInTheDocument();
  });

  it('changes header style on scroll', () => {
    customRender(<Header />, { providerProps: { value: mockContext } });

    expect(screen.getByRole('header')).not.toHaveClass('header-scroll');

    act(() => {
      window.scrollY = 50;
      fireEvent.scroll(window);
    });

    expect(screen.getByRole('header')).toHaveClass('header-scroll');
  });
});

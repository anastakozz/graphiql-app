import { fireEvent, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import en from '../localization/en.json';
import { customRender } from '../lib/utils/testUtils';

describe('NotFoundPage component', () => {
  const mockContext = {
    localData: {
      ...en,
      notFoundPage: {
        message: 'Page not found',
        buttonText: 'Go Home',
      },
    },
    changeLocalData: vi.fn(),
  };

  it('renders NotFoundPage with correct message and button', () => {
    const { getByText } = customRender(<NotFoundPage />, { providerProps: { value: mockContext } });

    const notFoundPage = screen.getByRole('not-found-page');
    expect(notFoundPage).toBeInTheDocument();

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();

    const errorMessage = getByText(/Page not found/i);
    expect(errorMessage).toBeInTheDocument();

    const goHomeButton = getByText('Go Home');
    expect(goHomeButton).toBeInTheDocument();
  });

  it('clicking the "Go Home" button navigates to the home page', () => {
    const { getByRole } = customRender(<NotFoundPage />, { providerProps: { value: mockContext } });

    const notFoundPage = screen.getByRole('not-found-page');
    expect(notFoundPage).toBeInTheDocument();

    const goHomeButton = getByRole('link', { name: /Go Home/i });
    fireEvent.click(goHomeButton);

    expect(window.location.pathname).toBe('/');
  });
});

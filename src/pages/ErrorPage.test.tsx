import { screen, fireEvent } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import en from '../localization/en.json';
import { customRender } from '../lib/utils/testUtils';

describe('ErrorPage component', () => {
  const mockContext = {
    localData: {
      ...en,
      errorPage: {
        message: 'Error Message',
        buttonText: 'Retry',
      },
    },
    changeLocalData: vi.fn(),
  };

  it('renders ErrorPage with correct message and button', () => {
    customRender(<ErrorPage />, { providerProps: { value: mockContext } });

    const errorPage = screen.getByRole('error-page');
    expect(errorPage).toBeInTheDocument();

    const errorMessage = screen.getByText('Error Message');
    expect(errorMessage).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it('calls handleClick when Retry button is clicked', () => {
    const { getByRole } = customRender(<ErrorPage />, { providerProps: { value: mockContext } });
    const retryButton = getByRole('button', { name: /retry/i });

    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    fireEvent.click(retryButton);

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});

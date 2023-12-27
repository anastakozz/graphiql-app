import { fireEvent, waitFor, screen } from '@testing-library/react';
import ApiErrorPopup from './ApiErrorPopup';
import { setupStore } from '../../store';
import { updateApiError } from '../../store/apiSlice';
import { renderWithProviders } from '../../lib/utils/testUtils';

describe('ApiErrorPopup component', () => {
  const store = setupStore();
  store.dispatch(updateApiError('Sample error message'));

  it('renders ErrorPopUp when error is present', async () => {
    renderWithProviders(<ApiErrorPopup />, { store });

    const errorPopUp = screen.getByText('Sample error message');
    expect(errorPopUp).toBeInTheDocument();
  });

  it('closes ErrorPopup on click', async () => {
    renderWithProviders(<ApiErrorPopup />, { store });

    const button = screen.getByRole('button', { name: 'x' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText('Sample error message')).not.toBeInTheDocument();
    });
  });
});

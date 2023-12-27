import { renderWithProviders } from '../../../lib/utils/testUtils';
import { setupStore } from '../../../store';
import { updateApiUrl } from '../../../store/apiSlice';
import { updateEditorResponse } from '../../../store/jsonSlice';
import ResponseBlock from './ResponseBlock';

import { screen, waitFor } from '@testing-library/react';

describe('RequestBlock component', () => {
  const store = setupStore();

  it('renders jsonEditor only when api url and response are in store', async () => {
    renderWithProviders(<ResponseBlock />, { store });
    expect(screen.queryByRole('json-editor')).not.toBeInTheDocument();

    store.dispatch(updateApiUrl('Sample url'));
    store.dispatch(updateEditorResponse('Sample response'));

    await waitFor(() => {
      expect(screen.getByText('Sample response')).toBeInTheDocument();
    });
  });
});

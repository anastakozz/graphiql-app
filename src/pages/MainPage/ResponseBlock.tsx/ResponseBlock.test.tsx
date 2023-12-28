import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../../../lib/utils/testUtils';
import { setupStore } from '../../../store';
import { updateApiUrl } from '../../../store/apiSlice';
import { updateEditorResponse } from '../../../store/jsonSlice';
import ResponseBlock from './ResponseBlock';

import { screen } from '@testing-library/react';

describe('RequestBlock component', () => {
  const store = setupStore();
  const testResponse = 'sample response';

  it('renders jsonEditor only when api url and response are in store', async () => {
    renderWithProviders(<ResponseBlock />, { store });
    expect(screen.queryByRole('json-editor')).not.toBeInTheDocument();

    act(() => {
      store.dispatch(updateApiUrl('Sample url'));
    });

    act(() => {
      store.dispatch(updateEditorResponse(testResponse));
    });

    expect(screen.getByText(testResponse)).toBeInTheDocument();
  });
});

import { renderWithProviders } from '../../../lib/utils/testUtils';
import { setupStore } from '../../../store';
import { langs } from '@uiw/codemirror-extensions-langs';
import RequestBlock from './RequestBlock';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { prettifyString } from '../../../lib/utils/prettifyString';
import { makeRequest } from '../../../services/api.service';
import { updateApiUrl } from '../../../store/apiSlice';

describe('RequestBlock component', () => {
  const store = setupStore();

  vi.mock('cm6-graphql', () => ({
    graphql: vi.fn(() => {
      return langs.json();
    }),
  }));

  vi.mock('../../../lib/utils/prettifyString', () => ({
    prettifyString: vi.fn(),
  }));

  vi.mock('../../../services/api.service', () => ({
    makeRequest: vi.fn(),
  }));

  it('renders ui with buttons, request button is disabled by default', () => {
    renderWithProviders(<RequestBlock />, { store });
    expect(screen.queryByRole('json-editor')).toBeDefined();
    expect(screen.queryByTestId('prettify-button')).toBeDefined();
    expect(screen.queryByTestId('play-button')).toBeDisabled();
  });

  it('calls prettifyString function onclick', async () => {
    renderWithProviders(<RequestBlock />, { store });
    fireEvent.click(screen.getByTestId('prettify-button'));
    await waitFor(() => {
      expect(prettifyString).toHaveBeenCalled();
    });
  });

  it('calls makeRequest function onclick', async () => {
    store.dispatch(updateApiUrl('test-url'));
    renderWithProviders(<RequestBlock />, { store });
    fireEvent.click(screen.getByTestId('play-button'));
    await waitFor(() => {
      expect(makeRequest).toHaveBeenCalled();
    });
  });
});

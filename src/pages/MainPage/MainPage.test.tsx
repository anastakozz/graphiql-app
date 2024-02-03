import { langs } from '@uiw/codemirror-extensions-langs';
import { setupStore } from '../../store';
import { renderWithProviders } from '../../lib/utils/testUtils';
import MainPage from './MainPage';
import { screen } from '@testing-library/react';
import { vi, expect, describe, it } from 'vitest';

describe('MainPage component', () => {
  const store = setupStore();

  vi.mock('cm6-graphql', () => ({
    graphql: vi.fn(() => {
      return langs.json();
    }),
  }));

  it('renders a page with all components', () => {
    renderWithProviders(<MainPage />, { store });
    expect(screen.getByTestId('prettify-button')).toBeInTheDocument();
    expect(screen.getByTestId('play-button')).toBeInTheDocument();
  });
});

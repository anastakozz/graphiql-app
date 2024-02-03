import { screen } from '@testing-library/react';
import Documentation from '../Documentation.tsx';
import { renderWithProviders } from '../../../lib/utils/testUtils.tsx';
import { setupStore } from '../../../store';
import { mockSchema } from './mocks.ts';

describe('Documentation', () => {
  const store = setupStore();
  vi.mock('../../../services/api.service', () => ({
    fetchSchema: vi.fn(() => mockSchema),
  }));

  it('should render documentation container', () => {
    renderWithProviders(
      <Documentation showDocs={false} apiUrl={''} isUrlChanged={false} setIsUrlChanged={vi.fn} />,
      { store }
    );
    const container = screen.getByTestId('docs-wrapper');
    expect(container).toBeInTheDocument();
  });

  it('should have docs-section-open class when showDocs is true', async () => {
    renderWithProviders(
      <Documentation showDocs={true} apiUrl={''} isUrlChanged={false} setIsUrlChanged={vi.fn} />,
      { store }
    );
    const container = screen.getByTestId('docs-wrapper');
    expect(container).toHaveClass('docs-section-open');
  });

  it('should have not docs-section-open class when showDocs is false', () => {
    renderWithProviders(
      <Documentation showDocs={false} apiUrl={''} isUrlChanged={false} setIsUrlChanged={vi.fn} />,
      { store }
    );
    const container = screen.getByTestId('docs-wrapper');
    expect(container).not.toHaveClass('docs-section-open');
  });

  it('should show loader', () => {
    vi.mock('../../../services/api.service', () => ({
      fetchSchema: vi.fn(() => {}),
    }));

    renderWithProviders(
      <Documentation showDocs={false} apiUrl={''} isUrlChanged={false} setIsUrlChanged={vi.fn} />,
      { store }
    );
    const loader = screen.getByRole('docsLoader');
    expect(loader).toBeInTheDocument();
  });
});

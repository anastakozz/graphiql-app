import { screen } from '@testing-library/react';
import Documentation from './Documentation.tsx';
import { renderWithProviders } from '../../lib/utils/testUtils.tsx';
import { setupStore } from '../../store';

describe('Documentation', () => {
  const store = setupStore();

  it('should render documentation container', () => {
    renderWithProviders(
      <Documentation showDocs={false} apiUrl={'https://spacex-production.up.railway.app/'} />,
      { store }
    );
    const container = screen.getByTestId('docs-wrapper');
    expect(container).toBeInTheDocument();
  });

  it('should have docs-section-open class when showDocs is true', async () => {
    renderWithProviders(
      <Documentation showDocs={true} apiUrl={'https://spacex-production.up.railway.app/'} />,
      { store }
    );
    const container = screen.getByTestId('docs-wrapper');
    expect(container).toHaveClass('docs-section-open');
  });

  it('should have not docs-section-open class when showDocs is false', () => {
    renderWithProviders(
      <Documentation showDocs={false} apiUrl={'https://spacex-production.up.railway.app/'} />,
      { store }
    );
    const container = screen.getByTestId('docs-wrapper');
    expect(container).not.toHaveClass('docs-section-open');
  });

  it('should show loader', () => {
    renderWithProviders(
      <Documentation showDocs={false} apiUrl={'https://spacex-production.up.railway.app/'} />,
      { store }
    );
    const loader = screen.getByRole('docsLoader');
    expect(loader).toBeInTheDocument();
  });
});

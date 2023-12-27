import { render, screen } from '@testing-library/react';
import { ScalarSection } from './ScalarSection.tsx';

describe('Scalar section', () => {
  it('should render component', () => {
    const mockOpenedType = {
      name: 'name',
      description: 'description',
      args: null,
      deprecationReason: 'reason',
    };

    render(<ScalarSection openedType={mockOpenedType} />);
    const headerName = screen.getByRole('headerName');
    expect(headerName).toBeInTheDocument();
  });
});

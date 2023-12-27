import { render, screen } from '@testing-library/react';
import { EnumSection } from './EnumSection.tsx';

describe('Enum section', () => {
  it('should render component', () => {
    const mockOpenedType = {
      name: 'name',
      description: 'description',
      args: null,
      deprecationReason: 'reason',
    };

    render(<EnumSection openedType={mockOpenedType} />);
    const header = screen.getByRole('headerName');
    expect(header).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { ObjectSection } from './ObjectSection.tsx';

describe('Object section', () => {
  it('should render component', () => {
    const mockOpenedType = {
      name: 'name',
      description: 'description',
      args: null,
      deprecationReason: 'reason',
    };

    render(
      <ObjectSection
        openedType={mockOpenedType}
        setOpenedTypes={vi.fn}
        mainIndex={0}
        typesActive={['']}
        setTypesActive={vi.fn}
      />
    );
    const description = screen.getByText('description');
    expect(description).toBeInTheDocument();
  });
});

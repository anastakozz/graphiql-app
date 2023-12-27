import { render, screen } from '@testing-library/react';
import { TypeDetails } from './TypeDetails.tsx';

describe('Type details', () => {
  it('should render type details header', () => {
    const mockOpenedType = {
      name: 'name',
      description: 'description',
      args: null,
      deprecationReason: 'reason',
    };

    const mockFields = {
      _fields: mockOpenedType,
      name: '',
      description: '',
    };

    const mockData = {
      typeDetails: 'details',
      button: 'button',
      arguments: 'args',
    };

    render(
      <TypeDetails
        openedType={mockOpenedType}
        setOpenedTypes={vi.fn}
        mainIndex={0}
        data={mockData}
        fields={mockFields}
        typesActive={['']}
        setTypesActive={vi.fn}
      />
    );
    const header = screen.getByRole('header');
    const closeBracket = screen.getByRole('closeBracket');
    expect(header).toBeInTheDocument();
    expect(closeBracket).toBeInTheDocument();
  });
});

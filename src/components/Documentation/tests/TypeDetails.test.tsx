import { render, screen } from '@testing-library/react';
import { TypeDetails } from '../DocsSections/OtherSections/ObjectSections/TypeDetails.tsx';
import { mockData, mockFields, openedTypeMock } from './mocks.ts';

describe('Type details', () => {
  it('should render type details header', () => {
    render(
      <TypeDetails
        openedType={openedTypeMock}
        setOpenedTypes={vi.fn}
        mainIndex={0}
        data={mockData}
        fields={mockFields}
        typesActive={['']}
        setTypesActive={vi.fn}
      />
    );
    const header = screen.getByRole('heading');
    const closeBracket = screen.getByRole('closeBracket');
    expect(header).toBeInTheDocument();
    expect(closeBracket).toBeInTheDocument();
  });
});

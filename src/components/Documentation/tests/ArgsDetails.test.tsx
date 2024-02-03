import { render, screen } from '@testing-library/react';
import { ArgsDetails } from '../DocsSections/OtherSections/ObjectSections/ArgsDetails.tsx';
import { mockData, openedTypeMock } from './mocks.ts';

describe('ArgsDetails', () => {
  it('renders ArgsDetails correctly', () => {
    render(
      <ArgsDetails
        openedType={openedTypeMock}
        setOpenedTypes={vi.fn}
        mainIndex={0}
        data={mockData}
        typesActive={['']}
        setTypesActive={vi.fn}
      />
    );

    expect(screen.getByText('Arguments')).toBeInTheDocument();
  });
});

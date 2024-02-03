import { render, screen } from '@testing-library/react';
import { ObjectHeader } from '../DocsSections/OtherSections/ObjectSections/ObjectHeader.tsx';
import { openedTypeMock } from './mocks.ts';

describe('Object header', () => {
  it('should render opened type name', () => {
    const openedTypeMock = {
      name: 'type',
      description: 'description',
      deprecationReason: 'reason',
      args: [],
    };

    render(<ObjectHeader openedType={openedTypeMock} />);
    const typeName = screen.getByTestId('objectTypeName');
    expect(typeName).toBeInTheDocument();
  });

  it('should render opened type type', () => {
    render(<ObjectHeader openedType={openedTypeMock} />);
    const objectType = screen.getByTestId('objectTypeType');
    expect(objectType).toBeInTheDocument();
  });
});

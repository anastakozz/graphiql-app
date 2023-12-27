import { render, screen } from '@testing-library/react';
import { ObjectHeader } from './ObjectHeader.tsx';

describe('Object header', () => {
  it('should render opened type name', () => {
    const openedTypeMock = {
      name: 'type name',
      description: 'description',
      args: [],
    };
    render(<ObjectHeader openedType={openedTypeMock} />);
    const typeName = screen.getByTestId('objectTypeName');
    expect(typeName).toBeInTheDocument();
  });

  it('should render opened type type', () => {
    const openedTypeMock = {
      name: 'type',
      description: 'description',
      args: [
        {
          name: 'name',
          type: {
            name: 'name',
            description: 'description',
          },
          description: 'description',
          args: null,
        },
      ],
    };
    render(<ObjectHeader openedType={openedTypeMock} />);
    const objectType = screen.getByTestId('objectTypeType');
    expect(objectType).toBeInTheDocument();
  });
});

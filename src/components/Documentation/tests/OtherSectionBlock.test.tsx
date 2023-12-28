import { render, screen } from '@testing-library/react';
import { OtherSectionsBlock } from '../DocsSections/OtherSections/OtherSectionsBlock.tsx';

describe('OtherSectionsBlock', () => {
  const mockOpenedType = {
    name: 'name',
    description: 'description',
    args: null,
    deprecationReason: 'reason',
    type: {
      name: 'name',
      description: 'description',
    },
  };

  it('renders ObjectSection when graphqlType is not GraphQLScalarType or GraphQLEnumType', () => {
    vi.mock('../../../lib/utils/getGraphQLType', () => ({
      getGraphQLType: vi.fn(() => 'GraphQLObjectType'),
    }));

    render(
      <OtherSectionsBlock
        openedType={mockOpenedType}
        setOpenedTypes={vi.fn}
        mainIndex={0}
        typesActive={['']}
        setTypesActive={vi.fn}
      />
    );

    expect(screen.getByText('description')).toBeInTheDocument();
  });

  it('renders ScalarSection when graphqlType is GraphQLScalarType', () => {
    vi.mock('../../../lib/utils/getGraphQLType', () => ({
      getGraphQLType: vi.fn(() => 'GraphQLScalarType'),
    }));
    render(
      <OtherSectionsBlock
        openedType={mockOpenedType}
        setOpenedTypes={vi.fn}
        mainIndex={0}
        typesActive={['']}
        setTypesActive={vi.fn}
      />
    );
    const headerName = screen.getByRole('headerName');
    expect(headerName).toBeInTheDocument();
  });
});

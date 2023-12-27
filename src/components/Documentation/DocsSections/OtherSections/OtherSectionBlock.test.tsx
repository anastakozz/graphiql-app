import { render, screen } from '@testing-library/react';
import { OtherSectionsBlock } from './OtherSectionsBlock';

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
    vi.mock('../../../../lib/utils/getGraphQLType', () => ({
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
    vi.mock('../../../../lib/utils/getGraphQLType', () => ({
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
    screen.debug();
    const headerName = screen.getByRole('headerName');
    expect(headerName).toBeInTheDocument();
  });
});

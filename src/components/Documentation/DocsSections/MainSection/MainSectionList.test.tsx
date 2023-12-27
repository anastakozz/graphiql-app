import { render, screen } from '@testing-library/react';
import { MainSectionList } from './MainSectionList';

describe('Main section list', () => {
  it('renders MainSectionList correctly', () => {
    const mockType = {
      name: 'Type1',
      ofType: {
        name: 'String',
        description: 'Some description',
      },
    };

    render(
      <MainSectionList
        type={mockType}
        setOpenedTypes={vi.fn()}
        header="queries"
        typeActive={undefined}
        setTypeActive={vi.fn()}
      />
    );

    expect(screen.getByText('QUERIES')).toBeInTheDocument();
  });
});

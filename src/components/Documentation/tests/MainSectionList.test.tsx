import { render, screen } from '@testing-library/react';
import { MainSectionList } from '../DocsSections/MainSection/MainSectionList.tsx';
import { mockType } from './mocks.ts';

describe('Main section list', () => {
  it('renders MainSectionList correctly', () => {
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

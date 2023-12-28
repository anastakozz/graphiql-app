import { render, screen, waitFor } from '@testing-library/react';
import { MainSectionList } from '../DocsSections/MainSection/MainSectionList.tsx';
import { mockFields, mockType, openedTypeMock } from './mocks.ts';
import userEvent from '@testing-library/user-event';

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

  it('setOpenedTypes is called on item click', async () => {
    const setOpenedTypesMock = vi.fn();
    render(
      <MainSectionList
        type={mockFields}
        setOpenedTypes={setOpenedTypesMock}
        header="queries"
        typeActive={undefined}
        setTypeActive={vi.fn()}
      />
    );

    const listItem = screen.getByText('Type1');
    userEvent.click(listItem);

    await waitFor(() => {
      expect(setOpenedTypesMock).toHaveBeenCalledWith([openedTypeMock]);
    });
  });
});

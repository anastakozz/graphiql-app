import { render, screen } from '@testing-library/react';
import { EnumSection } from '../DocsSections/OtherSections/EnumSection.tsx';
import { openedTypeMock } from './mocks.ts';

describe('Enum section', () => {
  it('should render component', () => {
    render(<EnumSection openedType={openedTypeMock} />);
    const header = screen.getByRole('headerName');
    expect(header).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { ScalarSection } from '../DocsSections/OtherSections/ScalarSection.tsx';
import { openedTypeMock } from './mocks.ts';

describe('Scalar section', () => {
  it('should render component', () => {
    render(<ScalarSection openedType={openedTypeMock} />);
    const headerName = screen.getByRole('headerName');
    expect(headerName).toBeInTheDocument();
  });
});

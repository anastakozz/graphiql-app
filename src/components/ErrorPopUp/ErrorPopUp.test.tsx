import { render, fireEvent } from '@testing-library/react';
import ErrorPopUp from './ErrorPopUp';

const onClickMock = vi.fn();

describe('ErrorPopUp component', () => {
  it('renders with error message', () => {
    const { getByText } = render(<ErrorPopUp onClick={() => {}} error="An error occurred" />);

    const closeButton = getByText('x');
    const errorMessage = getByText('An error occurred');

    expect(closeButton).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
  it('click on close button close pop up', () => {
    const { getByText } = render(<ErrorPopUp onClick={onClickMock} error="An error occurred" />);

    const closeButton = getByText('x');
    const errorMessage = getByText('An error occurred');

    expect(closeButton).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(errorMessage).toBeNull;
  });
  it('click on close button close pop up', () => {
    const { getByText, getByRole } = render(
      <ErrorPopUp onClick={onClickMock} error="An error occurred" />
    );

    const closeButton = getByText('x');
    const errorMessage = getByText('An error occurred');
    const shade = getByRole('shade');

    expect(closeButton).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();

    fireEvent.click(shade);
    expect(errorMessage).toBeNull;
  });
});

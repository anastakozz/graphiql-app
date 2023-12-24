import { render, fireEvent } from '@testing-library/react';
import ErrorPopUp from './ErrorPopUp'; // Update the import path based on your project structure

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
    const { getByText, getByTestId } = render(
      <ErrorPopUp onClick={onClickMock} error="An error occurred" />
    );

    const closeButton = getByText('x');
    const errorMessage = getByText('An error occurred');
    const shade = getByTestId('shade');

    expect(closeButton).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();

    fireEvent.click(shade);
    expect(errorMessage).toBeNull;
  });
});

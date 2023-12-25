import { render, fireEvent, waitFor } from '@testing-library/react';
import PrettifyButton from './PrettifyButton';

describe('PrettifyButton component', () => {
  it('renders PrettifyButton correctly', () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(<PrettifyButton onClick={onClickMock} />);

    const prettifyButton = getByRole('button');
    expect(prettifyButton).toBeInTheDocument();

    expect(prettifyButton).toHaveClass('action-button');
    expect(prettifyButton).toHaveClass('prettyfy-button');

    expect(prettifyButton).not.toHaveAttribute('disabled');
  });

  it('calls onClick function when the button is clicked', async () => {
    const onClickMock = vi.fn(() => Promise.resolve());
    const { getByRole } = render(<PrettifyButton onClick={onClickMock} />);

    fireEvent.click(getByRole('button'));

    await waitFor(() => expect(onClickMock).toHaveBeenCalledTimes(1));
  });
});

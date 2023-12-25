import { render, fireEvent, waitFor } from '@testing-library/react';
import PlayButton from './PlayButton';

describe('PlayButton component', () => {
  it('renders PlayButton correctly', () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(<PlayButton onClick={onClickMock} disabled={false} />);

    const playButton = getByRole('button');
    expect(playButton).toBeInTheDocument();

    expect(playButton).toHaveClass('action-button');
    expect(playButton).toHaveClass('run-button');

    expect(playButton).not.toHaveAttribute('disabled');
  });

  it('calls onClick function when the button is clicked', async () => {
    const onClickMock = vi.fn(() => Promise.resolve());
    const { getByRole } = render(<PlayButton onClick={onClickMock} disabled={false} />);

    fireEvent.click(getByRole('button'));

    await waitFor(() => expect(onClickMock).toHaveBeenCalledTimes(1));
  });

  it('disables the button when disabled prop is true', () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(<PlayButton onClick={onClickMock} disabled={true} />);

    const playButton = getByRole('button');
    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveAttribute('disabled');

    fireEvent.click(playButton);
    expect(playButton).toBeDisabled;
  });
});

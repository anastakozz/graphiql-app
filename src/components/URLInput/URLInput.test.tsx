import { fireEvent, render, waitFor } from '@testing-library/react';
import URLInput from './URLInput';
import { Provider } from 'react-redux';
import store from '../../store';
import userEvent from '@testing-library/user-event';

const InputMock = () => {
  return (
    <Provider store={store}>
      <URLInput />
    </Provider>
  );
};

const mockIntrospectApi = vi.fn();

vi.mock('../../services/api.service', () => ({
  introspectApi: vi.fn((value) => mockIntrospectApi(value)),
}));

describe('URLInput component', () => {
  it('renders URLInput correctly', () => {
    const { getByPlaceholderText, getByRole } = render(<InputMock />);

    const inputField = getByPlaceholderText('https://your-url');
    expect(inputField).toBeInTheDocument();

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('disables the button when the input field is empty', () => {
    const { getByRole } = render(<InputMock />);
    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  it('enables button on input and calls introspectApi', async () => {
    const { getByRole } = render(<InputMock />);

    const button = getByRole('button');
    const input = getByRole('textbox');

    userEvent.type(input, 'test');

    await waitFor(async () => {
      expect(button).toBeEnabled();
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(mockIntrospectApi).toHaveBeenCalled();
    });
  });
});

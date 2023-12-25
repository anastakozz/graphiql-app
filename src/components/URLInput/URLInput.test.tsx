import { render } from '@testing-library/react';
import URLInput from './URLInput';
import { Provider } from 'react-redux';
import store from '../../store';

const InputMock = () => {
  return (
    <Provider store={store}>
      <URLInput />
    </Provider>
  );
};

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
});

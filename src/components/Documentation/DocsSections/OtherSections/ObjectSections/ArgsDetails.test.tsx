import { render, screen } from '@testing-library/react';
import { ArgsDetails } from './ArgsDetails';

const mockArgs = [
  { name: 'arg1', description: 'description', args: null },
  { name: 'arg2', description: 'description', args: null },
];

const mockData = {
  arguments: 'Arguments',
  button: 'Button name',
  typeDetails: 'details',
};

const mockOpenedType = {
  args: mockArgs,
  name: 'name',
  description: 'description',
};

const mockSetOpenedTypes = vi.fn();

const mockMainIndex = 0;
const mockTypesActive = [''];
const mockSetTypesActive = vi.fn();

describe('ArgsDetails', () => {
  it('renders ArgsDetails correctly', () => {
    render(
      <ArgsDetails
        openedType={mockOpenedType}
        setOpenedTypes={mockSetOpenedTypes}
        mainIndex={mockMainIndex}
        data={mockData}
        typesActive={mockTypesActive}
        setTypesActive={mockSetTypesActive}
      />
    );

    expect(screen.getByText('Arguments')).toBeInTheDocument();
  });
});

import { describe, expect, it } from 'vitest';
import Button from './Button';
import { render, fireEvent } from '@testing-library/react';

describe('Button component', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('button-contained');
    expect(button).not.toHaveClass('button-link');
    expect(button).not.toHaveAttribute('disabled');
  });

  it('renders with specified variant and class name', () => {
    const { getByText } = render(
      <Button className="custom-class" variant="link">
        Link Button
      </Button>
    );
    const button = getByText('Link Button');
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('button-link');
    expect(button).toHaveClass('custom-class');
    expect(button).not.toHaveClass('button-contained');
  });

  it('handles click events', () => {
    const onClickMock = vi.fn();
    const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('renders as disabled when disabled prop is true', () => {
    const { getByText } = render(<Button disabled>Disabled Button</Button>);
    const button = getByText('Disabled Button');
    expect(button).toBeDisabled();
  });
});

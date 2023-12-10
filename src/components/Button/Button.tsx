import { ReactNode } from 'react';

type ButtonProps = {
  className?: string;
  variant?: string;
  children: string | ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
};

export default function Button({
  className,
  variant = 'contained',
  children,
  type = 'button',
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`button ${variant == 'contained' ? 'button-contained' : 'button-link'} ${
        className ? className : ''
      }`}
      type={type}
    >
      {children}
    </button>
  );
}

import React, { ButtonHTMLAttributes, memo } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  label: string;
  className?: string;
  onClick: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  className,
  type = 'button',
  onClick,
}) => (
  <button data-testid="show-more" className={className} onClick={onClick} type={type}>
    {label}
  </button>
);

export const Button = memo(ButtonComponent);

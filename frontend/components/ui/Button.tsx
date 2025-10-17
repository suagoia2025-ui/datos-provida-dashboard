'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const sizeClassnames: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base'
};

const variantClassnames: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600',
  secondary:
    'bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-400',
  ghost: 'bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:outline-gray-400'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    const computedDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
          sizeClassnames[size],
          variantClassnames[variant],
          className
        )}
        disabled={computedDisabled}
        {...props}
      >
        {isLoading ? 'Cargando…' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;



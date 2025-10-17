'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;



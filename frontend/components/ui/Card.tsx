'use client';

import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-gray-200 bg-white p-4 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;



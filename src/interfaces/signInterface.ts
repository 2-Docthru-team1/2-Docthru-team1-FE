import type { InputHTMLAttributes } from 'react';

export interface SignInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'email' | 'password' | 'text';
  label: string;
  placeholder: string;
}

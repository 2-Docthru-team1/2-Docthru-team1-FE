import type { InputHTMLAttributes } from 'react';

export interface SignInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'email' | 'password' | 'text' | 'passwordConfirm';
  label: string;
  placeholder: string;
}

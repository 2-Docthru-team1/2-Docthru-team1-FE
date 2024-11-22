import React from 'react';
import type { SignInputProps } from '@/interfaces/signInterface';

export default function SignInput({ type, label, placeholder, ...props }: SignInputProps) {
  return (
    <div className="w-[51.8rem] mb-[2.4rem]">
      <label htmlFor={type} className="text-gray-700 font-medium mb-[0.8rem] text-[1.4rem]">
        {label}
      </label>
      <input
        id={type}
        type={type}
        placeholder={placeholder}
        className="w-full bg-primary-white border border-gray-200 rounded-[1.2rem]rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-[1.1rem] px-[2rem]"
        {...props}
      />
    </div>
  );
}

import React from 'react';
import type { SignInputProps } from '@/interfaces/signInterface';

export default function SignInput({ type, label, placeholder, ...props }: SignInputProps) {
  return (
    <div className="flex flex-col w-[51.8rem] mb-[2.4rem]">
      <label htmlFor={type} className="text-gray-700 font-medium mb-[0.8rem] text-[1.4rem] leading-[1.6rem]">
        {label}
      </label>
      <input
        id={type}
        type={type}
        placeholder={placeholder}
        className="w-full bg-primary-white border border-gray-200 rounded-[1.2rem] focus:outline-none focus:ring-1 focus:ring-primary-beige py-[1.1rem] px-[2rem] text-[1.6rem] text-left placeholder-gray-400 text-gray-700"
        {...props}
      />
    </div>
  );
}

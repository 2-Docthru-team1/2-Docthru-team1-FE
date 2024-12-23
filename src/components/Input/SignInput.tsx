import Image from 'next/image';
import { useState } from 'react';
import type { SignInputProps } from '@/interfaces/signInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function SignInput({ type, label, placeholder, value, onChange, ...props }: SignInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex flex-col lg:w-[51.8rem] md:w-[51.8rem] mb-[2.4rem] sm:w-full sm:max-w-[51.8rem]">
      <label htmlFor={type} className=" text-gray-700 font-medium mb-[0.8rem] text-[1.4rem] leading-[1.6rem] sm:w-full">
        {label}
      </label>
      <div className="relative sm: w-full">
        {type === 'password' || type === 'passwordConfirm' ? (
          <div className="w-full">
            <input
              id={type}
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              className=" w-full bg-primary-white border border-gray-200 rounded-[1.2rem] focus:outline-none focus:border-primary-beige py-[1.1rem] px-[2rem] text-[1.6rem] text-left placeholder-gray-400 text-gray-700"
              value={value}
              onChange={onChange}
              {...props}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-[2rem] top-[50%] transform -translate-y-[50%] focus:outline-none"
            >
              <Image
                src={showPassword ? `${S3_BASE_URL}/icon_ps_vis_on.svg` : `${S3_BASE_URL}/icon_pw_vis_off.svg`}
                width={24}
                height={24}
                alt="Toggle password visibility"
                className="w-[2.4rem] h-[2.4rem]"
              />
            </button>
          </div>
        ) : (
          <input
            id={type}
            type={type}
            placeholder={placeholder}
            className="w-full bg-primary-white border border-gray-200 rounded-[1.2rem] focus:outline-none focus:border-primary-beige py-[1.1rem] px-[2rem] text-[1.6rem] text-left placeholder-gray-400 text-gray-700"
            value={value}
            onChange={onChange}
            {...props}
          />
        )}
      </div>
    </div>
  );
}

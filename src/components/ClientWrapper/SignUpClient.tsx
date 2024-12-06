'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signUp } from '@/api/authService';
import type { SignUpData } from '@/interfaces/userInterface';
import useSignUpValidate from '../../../hooks/useSignUpValidate';
import SignInput from '../Input/SignInput';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function SignUpClient() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/recipeList');
    }
  }, []);

  const { values, errors, validate, handleChange } = useSignUpValidate({
    email: '',
    name: '',
    password: '',
    passwordConfirmation: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    name: false,
    password: false,
    passwordConfirmation: false
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validate());
  }, [values]);

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const mutation = useMutation({
    mutationFn: async (userData: SignUpData) => {
      return await signUp(userData);
    },
    onSuccess: () => {
      router.push('/signIn');
    },
    onError: (error: any) => {
      let errorMessage = 'This email is already registered. Please use a different email address.';
      if (error?.response?.data?.field === '이미 존재하는 이메일입니다.') {
        errorMessage = 'This email is already registered. Please use a different email address.';
      }
      alert(errorMessage);
    }
  });

  const isLoading = mutation.status === 'pending';

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Image src={`${S3_BASE_URL}/loading.svg`} alt="로딩" width={200} height={200} />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      mutation.mutate({
        email: values.email,
        name: values.name,
        password: values.password
      });
    } else {
      const errorField = document.querySelector('[name="email"]');
      if (errorField instanceof HTMLElement) {
        errorField.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center w-[33.5rem] h-[6.7rem] sm:px-[4.6rem] sm:w-[25rem] sm:h-[5rem] relative lg:mt-0 md:mt-[12rem] sm:mt-[9.9rem]">
        <Image src={`${S3_BASE_URL}/img_logo_pc.svg`} alt="로고 이미지" className="mt-[5rem]" fill priority />
      </div>
      <div className="flex justify-center mt-[8rem] relative lg:w-full lg:px-0 sm:px-[1.6rem] sm:w-full md:px-[10rem] md:w-full">
        <form className="w-full flex flex-col items-center justify-center sm:px-[0.1rem]" onSubmit={handleSubmit}>
          <SignInput
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            name="email"
            onBlur={() => handleBlur('email')}
            required
          />
          {touched.email && errors.email && (
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[7.3rem] lg:pl-[1.2rem] md:pl-[1.2rem] lg:w-[51.8rem] md:max-w-[51.8rem] md:w-full sm:w-full sm:max-w-[51.8rem] sm:px-[1.8rem]">
              {errors.email}
            </span>
          )}
          <SignInput
            type="text"
            label="UserName"
            placeholder="Enter your username"
            value={values.name}
            onChange={handleChange}
            name="name"
            onBlur={() => handleBlur('name')}
            required
          />
          {touched.name && errors.name && (
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[16.9rem] lg:pl-[1.2rem] md:pl-[1.2rem] lg:w-[51.8rem] md:max-w-[51.8rem] md:w-full sm:w-full sm:max-w-[51.8rem] sm:px-[1.8rem]">
              {errors.name}
            </span>
          )}
          <SignInput
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            name="password"
            onBlur={() => handleBlur('password')}
            required
          />
          {touched.password && errors.password && (
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[26.3rem] lg:pl-[1.2rem] md:pl-[1.2rem] lg:w-[51.8rem] md:max-w-[51.8rem] md:w-full sm:w-full sm:max-w-[51.8rem] sm:px-[1.8rem]">
              {errors.password}
            </span>
          )}
          <SignInput
            type="passwordConfirm"
            label="Confirm Password"
            placeholder="Enter your confirm password"
            value={values.passwordConfirmation}
            onChange={handleChange}
            name="passwordConfirmation"
            onBlur={() => handleBlur('passwordConfirmation')}
            required
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[36rem] lg:pl-[1.2rem] md:pl-[1.2rem] lg:w-[51.8rem] md:max-w-[51.8rem] md:w-full sm:w-full sm:max-w-[51.8rem] sm:px-[1.8rem]">
              {errors.passwordConfirmation}
            </span>
          )}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`lg:w-[51.8rem] lg:mt-[1rem] md:w-[51.8rem] h-[4.8rem] rounded-[0.8rem] border-none text-[1.6rem] font-semibold text-primary-white sm:w-full sm:max-w-[51.8rem] ${isFormValid ? 'bg-primary-beige cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="flex justify-center gap-[1rem] mt-[2rem] ">
        <p className="text-[1.6rem] font-normal text-gray-600">Do you have an account?</p>
        <Link className="text-[1.6rem] font-normal text-gray-800 underline" href="/signIn">
          Sign in
        </Link>
      </div>
    </div>
  );
}

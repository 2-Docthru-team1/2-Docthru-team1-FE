'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import logoImg from '@/../public/assets/img_logo_pc.png';
import { signUp } from '@/api/authService';
import type { SignUpData } from '@/interfaces/userInterface';
import useSignUpValidate from '../../../hooks/useSignUpValidate';
import SignInput from '../Input/SignInput';

export default function SignUpClient() {
  const router = useRouter();

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
        <div className="relative w-[16rem] h-[16rem]">
          <div className="absolute inset-0 w-full h-full border-[4rem] border-t-[4rem] border-gray-300 border-t-primary-blue rounded-full animate-spin"></div>
          <span className="absolute inset-0 flex justify-center items-center text-[1.5rem] text-gray-500">Loading...</span>
        </div>
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
    <div>
      <div className="flex justify-center ">
        <Image src={logoImg} alt="로고 이미지" className="mt-[5rem]" />
      </div>
      <div className="flex justify-center mt-[4rem] relative">
        <form onSubmit={handleSubmit}>
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
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[7.3rem] pl-[1.2rem] ">{errors.email}</span>
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
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[16.9rem] pl-[1.2rem] ">{errors.name}</span>
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
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[26.3rem] pl-[1.2rem] ">
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
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[36rem] pl-[1.2rem] ">
              {errors.passwordConfirmation}
            </span>
          )}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-[51.8rem] h-[4.8rem] rounded-[0.8rem] border-none text-[1.6rem] font-semibold text-primary-white ${isFormValid ? 'bg-primary-beige cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
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

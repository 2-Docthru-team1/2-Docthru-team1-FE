'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import logoImg from '@/../public/assets/img_logo_pc.png';
import useSignUpValidate from '../../../hooks/useSignUpValidate';
import SignInput from '../Input/SignInput';

export default function SignUpClient() {
  const { values, errors, validate, handleChange } = useSignUpValidate({
    email: '',
    userName: '',
    password: '',
    passwordConfirmation: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    userName: false,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      const errorField = document.querySelector('[name="email"]');
      if (errorField instanceof HTMLElement) {
        errorField.focus();
      }
      return; // TODO: user data post하는 작업 예정
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
            placeholder="Enter you email"
            value={values.email}
            onChange={handleChange}
            name="email"
            onBlur={() => handleBlur('email')}
            required
          />
          {touched.email && errors.email && (
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[7.1rem] ">{errors.email}</span>
          )}
          <SignInput
            type="text"
            label="UserName"
            placeholder="Enter you nickname"
            value={values.userName}
            onChange={handleChange}
            name="userName"
            onBlur={() => handleBlur('userName')}
            required
          />
          {touched.userName && errors.userName && (
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[16.7rem] ">{errors.userName}</span>
          )}
          <SignInput
            type="password"
            label="Password"
            placeholder="Enter you password"
            value={values.password}
            onChange={handleChange}
            name="password"
            onBlur={() => handleBlur('password')}
            required
          />
          {touched.password && errors.password && (
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[26rem] ">{errors.password}</span>
          )}
          <SignInput
            type="password"
            label="Confirm Password"
            placeholder="Enter you confirm password"
            value={values.passwordConfirmation}
            onChange={handleChange}
            name="passwordConfirmation"
            onBlur={() => handleBlur('passwordConfirmation')}
            required
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <span className="text-error-red text-[1.2rem] font-normal absolute top-[35.7rem] ">
              {errors.passwordConfirmation}
            </span>
          )}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-[51.8rem] h-[4.8rem] rounded-[0.8rem] border-none bg-primary-beige text-[1.6rem] font-semibold text-primary-white ${isFormValid ? 'bg-primary-beige' : 'bg-gray-400 cursor-not-allowed'} cursor-pointer`}
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="flex justify-center gap-[1rem] mt-[2rem] ">
        <p className="text-[1.6rem] font-normal text-gray-600">Do you have an account?</p>
        <Link className="text-[1.6rem] font-normal text-gray-800" href="/signIn">
          Sign in
        </Link>
      </div>
    </div>
  );
}

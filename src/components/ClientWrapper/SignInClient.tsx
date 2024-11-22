'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import logoImg from '@/../public/assets/img_logo_pc.png';
import SignInput from '../Input/SignInput';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isFormValid = isValidEmail(email) && password.length >= 6;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleEmailBlur = () => {
    if (!isValidEmail(email)) {
      setEmailError('잘못된 이메일입니다.');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="">
      <div className="flex justify-center ">
        <Image src={logoImg} alt="로고 이미지" className="mt-[12rem]" />
      </div>
      <form onSubmit={handleSignIn}>
        <SignInput
          type="email"
          label="Email"
          placeholder="Please enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          required
        />
        {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
        <SignInput
          type="password"
          label="Password"
          placeholder="Please enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full text-primary-white border rounded-[0.8rem] text-center ${
            isFormValid ? 'bg-primary-beige' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!isFormValid}
        >
          Sign In
        </button>
        <p>Not a member yet?</p>
      </form>
      <div className="flex justify-center gap-[1rem] mt-[2rem]">
        <p className="text-[1.6rem] font-normal text-gray-600">Do you have an account?</p>
        <Link className="text-[1.6rem] font-normal text-gray-800" href="/signUp">
          Sign up now
        </Link>
      </div>
    </div>
  );
}

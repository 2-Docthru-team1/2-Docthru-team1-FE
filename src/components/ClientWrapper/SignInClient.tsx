'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import logoImg from '@/../public/assets/img_logo_pc.png';
import { signIn } from '@/api/signService';
import { useUserStatus } from '@/context/UserContext';
import SignInput from '../Input/SignInput';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserStatus } = useUserStatus();
  const router = useRouter();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isFormValid = isValidEmail(email) && password.length >= 6;
  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const credentials = { email, password };
      const res = await signIn(credentials);
      if (res.role === 'admin') {
        setUserStatus('admin');
      } else if (res.role === 'normal') {
        setUserStatus('normal');
      }
      router.push('/recipeList');
    } catch (err) {}
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[51.8rem]">
        <div className="flex justify-center">
          <Image src={logoImg} alt="로고 이미지" className="mt-[12.7rem] mb-[4rem]" />
        </div>
        <form onSubmit={handleSignIn}>
          <SignInput
            type="email"
            label="Email"
            placeholder="Please enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
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
            className={`w-full h-[4.8rem] text-[1.6rem] text-primary-white border rounded-[0.8rem] text-center ${
              isFormValid ? 'bg-primary-beige' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
          >
            Sign In
          </button>
        </form>
        <div className="flex justify-center gap-[1rem] mt-[2rem]">
          <p className="text-[1.6rem] font-normal text-gray-600">Not a member yet?</p>
          <Link className="text-[1.6rem] font-normal text-gray-800 underline" href="/signUp">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}

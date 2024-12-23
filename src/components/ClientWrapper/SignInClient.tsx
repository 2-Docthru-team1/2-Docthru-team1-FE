'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn } from '@/api/signService';
import useStore from '@/store/store';
import SignInput from '../Input/SignInput';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/recipeList');
    }
  }, []);

  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== '';
  };
  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const credentials = { email, password };
      const res = await signIn(credentials);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      router.push('/recipeList');
      const { login } = useStore.getState();
      login(res.id, res.role, res.name);
    } catch (err: any) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (err?.response?.data?.field === '이메일 또는 비밀번호가 잘못되었습니다.') {
        errorMessage = 'The username or password is incorrect.';
      }
      alert(errorMessage);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="md:w-[51.8rem] sm:w-[34.3rem]">
        <div className="flex justify-center">
          <Image
            src={`${S3_BASE_URL}/img_logo_pc.svg`}
            alt="로고 이미지"
            priority
            width={335}
            height={67}
            className="block md:w-[37.5rem] sm:w-3/4 md:mt-[12.7rem] sm:mt-[8.65rem] mb-[4rem]"
          />
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
              isFormValid() ? 'bg-primary-beige' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid()}
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

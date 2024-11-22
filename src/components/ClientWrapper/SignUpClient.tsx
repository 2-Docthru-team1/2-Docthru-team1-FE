'use client';

import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/../public/assets/img_logo_pc.png';
import useSignUpValidate from '../../../hooks/useSignUpValidate';

export default function SignUpClient() {
  const { values, errors, validate, handleChange } = useSignUpValidate({
    email: '',
    nickName: '',
    password: '',
    passwordConfirmation: ''
  });

  return (
    <div>
      <div>
        <Image src={logoImg} alt="로고 이미지" />
      </div>
      <form>
        {/* 재원님이 만드신 인풋 컴포넌트 삽입 */}
        <button></button>
      </form>
      <div>
        <p>Do you have an account?</p>
        <Link href="/signIn">Sign in</Link>
      </div>
    </div>
  );
}

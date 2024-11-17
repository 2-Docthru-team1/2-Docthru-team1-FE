'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import bell from '@/../public/assets/icon_bell_default.png';
import translate from '@/../public/assets/icon_translate.png';
import logo from '@/../public/assets/img_logo_pc.png';
import adminProfile from '@/../public/assets/img_profile_admin.png';
import userProfile from '@/../public/assets/img_profile_member.png';
import type { NavProps } from '@/interfaces/navInterface';


//TODO: Modal 띄우는 로직 추가 필요
export default function Nav({ userStatus = 'loggedOut', setIsModalOpen }: NavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isRecipe = pathname.includes('recipe');
  const isChallenge = pathname.includes('challenge');
  const isMgmt = pathname.includes('management');

  return (
    <div className="flex w-full h-[6rem] justify-center items-center border-b border-gray-100">
      <div className="w-[120rem] flex justify-between items-center">
        <div className="gap-[2.4rem] flex items-center justify-center">
          <Image className="w-[14.6rem] h-[2.92rem]" src={logo} alt="로고" onClick={() => router.push('/')} />
          <div className="flex">
            <p
              className={`flex items-center justify-center py-[2.1rem] px-[1.7rem] gap-[1rem] font-semibold leading-[1.79rem] text-[1.5rem]
                ${isRecipe ? 'text-primary-blue' : 'text-gray-600'}`}
              onClick={() => router.push('/recipeList')}
            >
              Recipe
            </p>
            <p
              className={`flex items-center justify-center py-[2.1rem] px-[1.7rem] gap-[1rem] font-semibold leading-[1.79rem] text-[1.5rem]
                ${isChallenge ? 'text-primary-blue' : 'text-gray-600'}`}
              onClick={() => router.push('/challenge')}
            >
              Challenge
            </p>
            {userStatus === 'adminUser' ? (
              <p
                className={`flex items-center justify-center py-[2.1rem] px-[1.7rem] gap-[1rem] font-semibold leading-[1.79rem] text-[1.5rem]
                ${isMgmt ? 'text-primary-blue' : 'text-gray-600'}`}
                onClick={() => router.push('/management')}
              >
                Mgmt.
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="flex gap-[1.6rem] items-center justify-center cursor-pointer">
          <Image src={translate} alt="번역" onClick={() => setIsModalOpen(true)} />
          {userStatus === 'generalUser' ? (
            <>
              <Image src={bell} alt="벨" />
              <Image src={userProfile} alt="프로필" />
            </>
          ) : userStatus === 'adminUser' ? (
            <Image src={adminProfile} alt="프로필" />
          ) : (
            <button
              className="flex rounded-[0.8rem] px-[2.4rem] py-[1.1rem] gap-[1rem] bg-primary-blue font-semibold text-[1.6rem] leading-[1.909rem] text-[#ffffff]"
              onClick={() => router.push('/signin')}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

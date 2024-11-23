'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import bell from '@/../public/assets/icon_bell_default.png';
import translate from '@/../public/assets/icon_translate.png';
import logo from '@/../public/assets/img_logo_pc.png';
import adminProfile from '@/../public/assets/img_profile_admin.png';
import userProfile from '@/../public/assets/img_profile_member.png';
import { useUserStatus } from '@/context/UserContext';
import { logout } from '@/utils/auth';
import ClosableModalClient from '../ClientWrapper/ClosableModalClient';

export default function Nav() {
  const { userStatus, setUserStatus } = useUserStatus();
  const router = useRouter();
  const pathname = usePathname();

  const isRecipe = pathname.includes('recipe');
  const isChallenge = pathname.includes('challenge');
  const isMgmt = pathname.includes('management');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = () => {
    setUserStatus('loggedOut');
    logout();
  };

  return (
    <div className="w-full h-full flex">
      <div className="flex w-full h-[6rem] justify-center items-center border-b border-gray-100">
        <div className="w-[120rem] flex justify-between items-center">
          <div className="gap-[2.4rem] flex items-center justify-center">
            <Image
              className="w-[14.6rem] h-[2.92rem]"
              src={logo}
              alt="로고"
              onClick={() => {
                if (userStatus !== 'loggedOut') {
                  router.push('/recipeList');
                } else {
                  router.push('/');
                }
              }}
            />

            <div className="flex">
              {userStatus !== 'loggedOut' && (
                <>
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
                    onClick={() => router.push('/challengeList')}
                  >
                    Challenge
                  </p>
                  {userStatus === 'admin' && (
                    <p
                      className={`flex items-center justify-center py-[2.1rem] px-[1.7rem] gap-[1rem] font-semibold leading-[1.79rem] text-[1.5rem]
                ${isMgmt ? 'text-primary-blue' : 'text-gray-600'}`}
                      onClick={() => router.push('/management')}
                    >
                      Mgmt.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex gap-[1.6rem] items-center justify-center cursor-pointer">
            <Image src={translate} alt="번역" onClick={() => setIsModalOpen(true)} />
            {userStatus === 'normal' ? (
              <>
                <Image src={bell} alt="벨" />
                <Image src={userProfile} alt="프로필" />
                <button
                  className="flex rounded-[0.8rem] px-[2.4rem] py-[1.1rem] gap-[1rem] bg-primary-blue font-semibold text-[1.6rem] leading-[1.909rem] text-[#ffffff]"
                  onClick={handleSignOut}
                >
                  Log Out
                </button>
              </>
            ) : userStatus === 'admin' ? (
              <>
                <Image src={adminProfile} alt="프로필" />
                <button
                  className="flex rounded-[0.8rem] px-[2.4rem] py-[1.1rem] gap-[1rem] bg-primary-blue font-semibold text-[1.6rem] leading-[1.909rem] text-[#ffffff]"
                  onClick={handleSignOut}
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                className="flex rounded-[0.8rem] px-[2.4rem] py-[1.1rem] gap-[1rem] bg-primary-blue font-semibold text-[1.6rem] leading-[1.909rem] text-[#ffffff]"
                onClick={() => router.push('/signIn')}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
      <ClosableModalClient isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}

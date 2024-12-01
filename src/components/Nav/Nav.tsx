'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import bell from '@/../public/assets/icon_bell_default.png';
import translate from '@/../public/assets/icon_translate.png';
import logo from '@/../public/assets/img_logo_pc.png';
import adminProfile from '@/../public/assets/img_profile_admin.png';
import userProfile from '@/../public/assets/img_profile_member.png';
import useStore from '@/store/store';
import ClosableModalClient from '../ClientWrapper/ClosableModalClient';
import ProfileModal from '../Modal/ProfileModal';

export default function Nav() {
  const userStatus = useStore(state => state.userStatus);
  const router = useRouter();
  const pathname = usePathname();

  const isRecipe = pathname.startsWith('/recipe');
  const isChallenge = pathname.startsWith('/challenge');
  const isMgmt = pathname.startsWith('/auth');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { name, role } = useStore();

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex w-full h-[6rem] justify-center items-center border-b border-gray-100">
        <div className="w-full lg:px-[18rem] md:px-[2.4rem] sm:px-[1.5rem]">
          <div className="flex justify-between items-center">
            <div className="md:gap-[2.4rem] flex items-center justify-center">
              <Image
                className="md:w-[14.6rem] md:h-[2.92rem] sm:w-[10rem] sm:h-[2rem] cursor-pointer sm:mr-[0.8rem]"
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
                      className={`flex items-center justify-center py-[2.1rem] md:px-[1.7rem] md:px-[0.6rem] gap-[1rem] font-semibold leading-[1.79rem] md:text-[1.5rem] sm:text-[1.3rem] cursor-pointer ${isRecipe ? 'text-primary-blue' : 'text-gray-600'}`}
                      onClick={() => router.push('/recipeList')}
                    >
                      Recipe
                    </p>
                    <p
                      className={`flex items-center justify-center py-[2.1rem] px-[1.7rem] gap-[1rem] font-semibold leading-[1.79rem] md:text-[1.5rem] sm:text-[1.3rem] cursor-pointer  ${isChallenge ? 'text-primary-blue' : 'text-gray-600'}`}
                      onClick={() => router.push('/challengeList')}
                    >
                      Challenge
                    </p>
                    {userStatus === 'admin' && (
                      <p
<<<<<<< HEAD
                        className={`flex items-center justify-center py-[2.1rem] gap-[1rem] font-semibold leading-[1.79rem] md:text-[1.5rem] sm:text-[1.3rem] cursor-pointer ${isMgmt ? 'text-primary-blue' : 'text-gray-600'}`}
=======
                        className={`flex items-center justify-center py-[2.1rem] px-[1.7rem] sm:px-0 gap-[1rem] font-semibold leading-[1.79rem] md:text-[1.5rem] sm:text-[1.3rem] cursor-pointer ${isMgmt ? 'text-primary-blue' : 'text-gray-600'}`}
>>>>>>> 99f54dcc88a7e3410eaba985d0e41371d2a14147
                        onClick={() => router.push('/auth/challenge')}
                      >
                        Mgmt.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex md:gap-[1.6rem] sm:gap-[1rem] items-center justify-center cursor-pointer">
              <Image src={translate} alt="번역" onClick={() => setIsModalOpen(true)} width={24} height={24} />
              {userStatus === 'normal' ? (
                <>
                  <Image src={bell} alt="벨" />
                  <div className="relative">
                    <Image
                      src={userProfile}
                      alt="프로필"
                      onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                      className="cursor-pointer"
                    />
                    {isProfileModalOpen && (
                      <div className="z-[15] absolute right-0 top-full mt-[0.8rem]">
                        <ProfileModal name={name ?? 'Unknown'} role={role ?? 'normal'} />
                      </div>
                    )}
                  </div>
                </>
              ) : userStatus === 'admin' ? (
                <div className="relative">
                  <Image
                    src={adminProfile}
                    alt="프로필"
                    width={24}
                    height={24}
                    onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                    className="cursor-pointer"
                  />
                  {isProfileModalOpen && (
                    <div className="z-[15] absolute right-0 top-full mt-[0.8rem]">
                      <ProfileModal name={name ?? 'Unknown'} role={role ?? 'admin'} />
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="whitespace-nowrap flex rounded-[0.8rem] px-[2.4rem] py-[1.1rem] gap-[1rem] bg-primary-blue font-semibold text-[1.6rem] leading-[1.909rem] text-primary-white"
                  onClick={() => router.push('/signIn')}
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="z-50">
        <ClosableModalClient isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
}

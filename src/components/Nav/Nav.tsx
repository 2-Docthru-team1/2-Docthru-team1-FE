'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getNotification } from '@/api/userService';
import type { Notification } from '@/interfaces/modalInterface';
import useStore from '@/store/store';
import ClosableModalClient from '../ClientWrapper/ClosableModalClient';
import NotificationModal from '../Modal/NotificationModal';
import ProfileModal from '../Modal/ProfileModal';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function Nav() {
  const userStatus = useStore(state => state.userStatus);
  const router = useRouter();
  const pathname = usePathname();

  const isRecipe = pathname.startsWith('/recipe');
  const isChallenge = pathname.startsWith('/challenge');
  const isMgmt = pathname.startsWith('/auth');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { name, role } = useStore();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const updateUnreadStatus = (notifications: Notification[]) => {
    setHasUnreadNotifications(notifications.some(notification => !notification.isRead));
  };

  const handleNotificationClick = (challengeId: string, workId: string) => {
    if (challengeId && workId) {
      router.push(`/challengeList/${challengeId}/${workId}`);
    } else if (challengeId) {
      router.push(`/challengeList/${challengeId}`);
    }
  };

  const fetchNotifications = async () => {
    const token = accessToken || localStorage.getItem('accessToken');
    if (!token) return;
    const serverNotifications = await getNotification();
    setNotifications(serverNotifications);
    updateUnreadStatus(serverNotifications);
  };

  const setupWebSocket = (token: string) => {
    const socket = io('http://ec2-43-200-2-208.ap-northeast-2.compute.amazonaws.com', {
      auth: { token },
      withCredentials: true
    });

    socket.on('challengeStatusChangedFinished', newNotification => {
      setNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, 15);
        updateUnreadStatus(updated);
        return updated;
      });
    });

    socket.on('newFeedback', newNotification => {
      setNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, 15);
        updateUnreadStatus(updated);
        return updated;
      });
    });

    return socket;
  };

  useEffect(() => {
    if (userStatus === 'normal' || userStatus === 'admin') {
      const token = localStorage.getItem('accessToken');
      setAccessToken(token);
    }
  }, [userStatus]);

  useEffect(() => {
    if (!accessToken) return;

    fetchNotifications();
    const socket = setupWebSocket(accessToken);

    return () => {
      socket.disconnect();
    };
  }, [accessToken]);

  useEffect(() => {
    setIsNotificationModalOpen(false);
    setIsProfileModalOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isNotificationModalOpen) {
      fetchNotifications();
    }
  }, [isNotificationModalOpen]);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex w-full h-[6rem] justify-center items-center border-b border-gray-100">
        <div className="w-full md:px-[2.4rem] sm:px-[1.5rem] flex justify-center">
          <div className="lg:max-w-[120rem] lg:w-full sm:w-full flex justify-between items-center">
            <div className="md:gap-[2.4rem] flex items-center justify-center">
              <div className="relative md:w-[14.6rem] md:h-[2.92rem] sm:w-[10rem] sm:h-[2rem] cursor-pointer sm:mr-[0.8rem]">
                <Image
                  fill
                  src={`${S3_BASE_URL}/img_logo_pc.svg`}
                  alt="로고"
                  sizes="(max-width: 744px) 10rem, (max-width: 1200px) 14.6rem"
                  onClick={() => {
                    if (userStatus !== 'loggedOut') {
                      router.push('/recipeList');
                    } else {
                      router.push('/');
                    }
                  }}
                />
              </div>
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
                        className={`flex items-center justify-center py-[2.1rem] px-[1.7rem] sm:px-0 gap-[1rem] font-semibold leading-[1.79rem] md:text-[1.5rem] sm:text-[1.3rem] cursor-pointer ${isMgmt ? 'text-primary-blue' : 'text-gray-600'}`}
                        onClick={() => router.push('/auth/challenge')}
                      >
                        Mgmt.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex md:gap-[1.6rem] sm:gap-[1rem] items-center justify-center">
              <Image
                src={`${S3_BASE_URL}/icon_translate.svg`}
                alt="번역"
                onClick={() => setIsModalOpen(true)}
                width={24}
                height={24}
                className="cursor-pointer"
              />
              {userStatus === 'normal' ? (
                <>
                  <div className="relative">
                    <Image
                      src={`${S3_BASE_URL}/${hasUnreadNotifications ? 'icon_bell_noti.svg' : 'icon_bell_default.svg'}`}
                      alt="bell"
                      width={24}
                      height={24}
                      onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
                      className="cursor-pointer"
                    />
                    {isNotificationModalOpen && (
                      <div className="z-[30] absolute right-0 top-full mt-[1.2rem]">
                        <NotificationModal
                          notifications={notifications}
                          onClose={() => setIsNotificationModalOpen(false)}
                          onNotificationClick={handleNotificationClick}
                        />
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <Image
                      src={`${S3_BASE_URL}/img_profile_member.svg`}
                      width={32}
                      height={32}
                      alt="유저 프로필"
                      onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                      className="cursor-pointer"
                    />
                    {isProfileModalOpen && (
                      <div className="z-[30] absolute right-0 top-full mt-[0.8rem]">
                        <ProfileModal name={name ?? 'Unknown'} role={role ?? 'normal'} />
                      </div>
                    )}
                  </div>
                </>
              ) : userStatus === 'admin' ? (
                <div className="relative">
                  <Image
                    src={`${S3_BASE_URL}/img_profile_admin.svg`}
                    alt="어드민 프로필"
                    width={32}
                    height={32}
                    onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                    className="cursor-pointer"
                  />
                  {isProfileModalOpen && (
                    <div className="z-[30] absolute right-0 top-full mt-[0.8rem]">
                      <ProfileModal name={name ?? 'Unknown'} role={role ?? 'admin'} />
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="whitespace-nowrap flex rounded-[0.8rem] md:px-[2.4rem] md:py-[1.1rem] sm:px-[1.9rem] sm:py-[0.7rem] gap-[1rem] bg-primary-blue font-semibold md:text-[1.6rem] sm:text-[1.3rem] md:leading-[1.909rem] sm:leading-[1.551rem] text-primary-white"
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

'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import bell from '@/../public/assets/icon_bell_default.png';
import translate from '@/../public/assets/icon_translate.png';
import logo from '@/../public/assets/img_logo_pc.png';
import adminProfile from '@/../public/assets/img_profile_admin.png';
import userProfile from '@/../public/assets/img_profile_member.png';
import { getNotification } from '@/api/userService';
import useStore from '@/store/store';
import ClosableModalClient from '../ClientWrapper/ClosableModalClient';
import NotificationModal from '../Modal/NotificationModal';
import ProfileModal from '../Modal/ProfileModal';

interface NotificationFinished {
  message: string;
  challengeId: string;
  createdAt: string;
}

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

  // NOTE 혹시 몰라 둔 socket 설정
  // transports: ['polling' ,'websocket'],
  // secure: true,
  const [notificationsFinished, setNotificationsFinished] = useState<NotificationFinished[]>([]);
  // const [unreadNotificationCount, setUnreadNotificationCount] = useState<number>(0); // 읽지 않은 알림 개수

  const fetchNotifications = async () => {
    try {
      const serverNotifications = await getNotification();
      setNotificationsFinished(serverNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  const setupWebSocket = (token: string) => {
    const socket = io('http://15.165.57.191', {
      auth: { token }
    });

    socket.on('challengeStatusChangedFinished', notificationsFinished => {
      setNotificationsFinished(prevNotifications => [notificationsFinished, ...prevNotifications].slice(0, 15));
    });

    return socket;
  };
  useEffect(() => {
    // // 로컬 스토리지에서 알림 상태를 불러옵니다.
    // const storedNotifications = localStorage.getItem('notifications');
    // if (storedNotifications) {
    //   const notifications = JSON.parse(storedNotifications);
    //   setNotificationsFinished(notifications);
    //   setUnreadNotificationCount(notifications.filter((n: NotificationFinished) => !n.isRead).length);
    // }
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.warn('Access token not found.');
      return;
    }
    fetchNotifications();
    const socket = setupWebSocket(accessToken);

    // // 알림이 15개 이상이면 가장 오래된 알림을 삭제
    // const updatedNotifications = [...prevNotifications, newNotification];
    // if (updatedNotifications.length > 15) {
    //   updatedNotifications.shift(); // 가장 오래된 알림 제거
    // }
    // // 알림을 로컬 스토리지에 저장
    // localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    // return updatedNotifications;
    // // 읽지 않은 알림 개수 업데이트
    // setUnreadNotificationCount(prevCount => prevCount + 1);

    return () => {
      socket.disconnect();
    };
  }, []);

  // const handleNotificationClick = () => {
  //   // 알림 모달을 열 때, 읽지 않은 알림을 읽음 처리
  //   setIsNotificationModalOpen(!isNotificationModalOpen);
  //   if (unreadNotificationCount > 0) {
  //     setUnreadNotificationCount(0);
  //     // 읽은 알림은 로컬 스토리지에서 업데이트
  //     setNotificationsFinished(prevNotifications =>
  //       prevNotifications.map(notification => ({ ...notification, isRead: true }))
  //     );
  //     localStorage.setItem('notifications', JSON.stringify(notificationsFinished));
  //   }
  // };

  useEffect(() => {
    setIsNotificationModalOpen(false);
    setIsProfileModalOpen(false);
  }, [pathname]);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex w-full h-[6rem] justify-center items-center border-b border-gray-100">
        <div className="w-full md:px-[2.4rem] sm:px-[1.5rem] flex justify-center">
          <div className="lg:max-w-[120rem] lg:w-full sm:w-full flex justify-between items-center">
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
                src={translate}
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
                      src={bell}
                      alt="벨"
                      onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
                      className="cursor-pointer"
                    />
                    {/* 빨간 색 점 표시 */}
                    {/* {unreadNotificationCount > 0 && (
                      <span className="absolute right-0 top-0 w-[0.8rem] h-[0.8rem] bg-red-500 rounded-full"></span>
                    )} */}
                    {isNotificationModalOpen && (
                      <div className="z-[30] absolute right-0 top-full mt-[1.2rem]">
                        <NotificationModal
                          notificationsFinished={notificationsFinished}
                          onClose={() => setIsNotificationModalOpen(false)}
                        />
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <Image
                      src={userProfile}
                      alt="프로필"
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
                    src={adminProfile}
                    alt="프로필"
                    width={24}
                    height={24}
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

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AdminProfile from '@/../public/assets/img_profile_admin.png';
import MemProfile from '@/../public/assets/img_profile_member.png';
import type { ProfileModalProps } from '@/interfaces/userInterface';
import useStore from '@/store/store';

export default function ProfileModal({ name, role }: ProfileModalProps) {
  const router = useRouter();

  const isMem = role === 'normal' ? true : false;
  const profileImg = role === 'normal' ? MemProfile : AdminProfile;
  const userRole = role === 'normal' ? 'Koo-koo' : 'Admin';

  const handleSignOut = () => {
    const { logout } = useStore.getState();
    router.push('/');
    logout();
  };

  const handleRouteMyPage = () => {
    router.push('/me');
  };

  return (
    <div className="w-full h-[100vh] ">
      <div className="w-[19.5rem] bg-primary-white rounded-[0.8rem] border-2 border-gray-100 p-[1.8rem] gap-[1.3rem] flex flex-col">
        <div className="flex gap-[0.8rem]">
          <Image src={profileImg} alt="profile" width={32} height={32} />
          <div className="flex flex-col gap-[0.2rem]">
            <p className="font-medium text-[1.4rem] leading-[1.671rem] text-gray-800">{name}</p>
            <p className="font-medium text-[1.2rem] leading-[1.432rem] text-gray-500">{userRole}</p>
          </div>
        </div>
        <div className="border border-gray-200 w-full" /> {/* 직선 */}
        <div className="flex flex-col gap-[1.2rem]">
          {isMem ? (
            <p className="font-medium text-[1.6rem] leading-[1.909rem] text-gray-600" onClick={handleRouteMyPage}>
              My Challenge
            </p>
          ) : null}
          <p className="font-medium text-[1.6rem] leading-[1.909rem] text-error-red" onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      </div>
    </div>
  );
}

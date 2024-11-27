import Image from 'next/image';
import AdminProfile from '@/../public/assets/img_profile_admin.png';
import MemProfile from '@/../public/assets/img_profile_member.png';
import type { ProfileModalProps } from '@/interfaces/userInterface';

export default function ProfileModal({ name, role }: ProfileModalProps) {
  const isMem = role === 'normal' ? 'koo-koo' : 'admin';
  const profileSrc = role === 'normal' ? MemProfile : AdminProfile;

  return (
    <div>
      <div>
        <Image src={isMem} alt="profile" />
        <div>
          <p>{name}</p>
          <p>{isMem}</p>
        </div>
      </div>
      <div className="border border-gray-200 w-full mt-[1.2rem] mb-[1.2rem]" /> {/* 직선 */}
      <p>My Challenge</p>
      <p>Sign out</p>
    </div>
  );
}

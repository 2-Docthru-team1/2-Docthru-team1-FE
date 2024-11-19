import { format } from 'date-fns';
import Image from 'next/image';
import nextImage from '@/../public/assets/btn_photo_swipe.png';
import inactiveHeart from '@/../public/assets/icon_heart_inactive_large.png';
import member from '@/../public/assets/img_profile_member.png';
import food from '@/../public/temporaryAssets/Food.svg';
import type { WorkDataProps } from '@/interfaces/workInterface';

export default function WorkCard({ data, user }: WorkDataProps) {
  if (!data) {
    return <div>로딩 중...</div>;
  }

  const formattedDate = format(new Date(data.createdAt), 'yy/MM/dd HH:mm');
  const formattedNumber = data.likeCount.toLocaleString();

  return (
    <div className="flex flex-col w-[120rem] gap-[1rem]">
      <div className="border-b border-b-gray-200 pb-[1.5rem]">
        <p className="text-[2.4rem] font-bold text-left text-gray-700">{data.title}</p>
      </div>
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-[1.5rem] mb-[1rem]">
        <div className="flex items-center gap-[0.5rem]">
          <Image src={member} alt="유저이미지" width={24} height={24} />
          <p className="text-[1.4rem] font-medium text-gray-800">{user.name}</p>
          <p className="text-[1.2rem] font-medium text-gray-500 mr-[0.5rem]">{user.role}</p>
          <Image src={inactiveHeart} alt="비활성 하트" width={24} height={24} />
          <p className="text-[1.4rem] font-medium text-gray-800">{formattedNumber}</p>
        </div>
        <div>
          <p className="text-[1.4rem] font-medium text-gray-400">{formattedDate}</p>
        </div>
      </div>
      <div className="flex">
        <div className="mr-[0.3rem] w-[47.6rem] h-[47.6rem] relative">
          <Image src={food} alt="작업물 이미지" fill className="object-cover" /> {/* src={data.images} */}
        </div>
        <div className="flex items-center">
          <Image src={nextImage} alt="다음 이미지 버튼" />
        </div>
        <p className="text-[1.6rem] font-normal text-gray-800">{data.content}</p>
      </div>
    </div>
  );
}

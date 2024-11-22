import { format } from 'date-fns';
import Image from 'next/image';
import heart from '@/../public/assets/icon_heart_inactive_large.png';
import medal from '@/../public/assets/icon_medal.png';
import profile from '@/../public/assets/img_profile_member.png';
import food from '@/../public/temporaryAssets/Food.svg';
import type { ChallengeMostLikedCardProps } from '@/interfaces/cardInterface';

export default function ChallengeMostLikedCard({ data }: ChallengeMostLikedCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yy HH:mm');
  };

  return (
    <div className="flex flex-col w-[88.9rem] border-2 border-gray-100 rounded-[1.6rem] bg-primary-white">
      <div className="flex w-[15.09rem] h-[4rem] items-center bg-gray-700 rounded-tl-[1.4rem] rounded-br-[1.4rem] justify-center gap-[0.4rem]">
        <Image src={medal} alt="medal" />
        <p className="font-medium text-[1.4rem] leading-[1.671rem] text-[#ffffff]">The Most Liked</p>
      </div>
      <div className="flex mt-[1.4rem] ml-[1.4rem] justify-between">
        <div className="w-[28rem] h-[28.2rem] relative">
          <Image src={food} alt="food" layout="fill" objectFit="cover" />
        </div>
        <div className="flex flex-col w-[47.427rem]">
          <p className="font-bold text-[2rem] leading-[2.6rem] text-gray-700">{data.title}</p>
          <div className="flex justify-between">
            <div className="flex gap-[1rem] items-center">
              <div className="flex gap-[0.8rem] items-center">
                <Image src={profile} alt="프로필" />
                <div>
                  <p>{data.ownerId}</p>
                  <p>{data.role}</p>
                </div>
              </div>
              <div>
                <Image src={heart} alt="heart" />
                <p>{data.likeCount}</p>
              </div>
            </div>
            <div>
              <p>{formatDate(data.createdAt)}</p>
            </div>
          </div>
          <div /> {/* 직선 */}
          <div>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

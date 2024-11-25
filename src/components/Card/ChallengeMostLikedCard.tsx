import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import arrowUp from '@/../public/assets/ic_view_less_arrow_up.png';
import arrowDown from '@/../public/assets/ic_view_more_arrow_down.png';
import heart from '@/../public/assets/icon_heart_inactive_large.png';
import medal from '@/../public/assets/icon_medal.png';
import profile from '@/../public/assets/img_profile_member.png';
import food from '@/../public/temporaryAssets/Food.svg';
import type { ChallengeMostLikedCardProps } from '@/interfaces/cardInterface';

export default function ChallengeMostLikedCard({ data }: ChallengeMostLikedCardProps) {
  const [viewFeedback, setViewFeedback] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yy/MM/dd HH:mm');
  };

  const rol = data.role === 'normal' ? 'koo-koo' : data.role === 'admin' ? 'admin' : '';

  const handleViewFeedback = () => {
    setViewFeedback(prev => !prev);
  };

  return (
    <div className="flex flex-col w-[88.9rem] border-2 border-gray-100 rounded-[1.6rem] bg-primary-white">
      <div className="flex w-[15.09rem] h-[4rem] items-center bg-gray-700 rounded-tl-[1.4rem] rounded-br-[1.4rem] justify-center gap-[0.4rem]">
        <Image src={medal} alt="medal" />
        <p className="font-medium text-[1.4rem] leading-[1.671rem] text-primary-white">The Most Liked</p>
      </div>
      <div className="flex mt-[1.4rem] ml-[1.4rem] mr-[1.4rem] justify-between">
        <div className="w-[28rem] h-[28.2rem] relative">
          <Image src={food} alt="food" layout="fill" objectFit="cover" />
        </div>
        <div className="flex flex-col w-[47.427rem]">
          <p className="font-bold text-[2rem] leading-[2.6rem] text-gray-700">{data.title}</p>
          <div className="flex justify-between">
            <div className="flex gap-[1rem] items-center">
              <div className="flex gap-[0.8rem] items-center">
                <Image src={profile} alt="프로필" />
                <div className="flex gap-[0.6rem] items-center">
                  <p className="font-medium text-[1.4rem] leading-[1.671rem]">{data.ownerId}</p>
                  <p className="font-medium text-[1.2rem] leading-[1.432rem] text-gray-500">{rol}</p>
                </div>
              </div>
              <div className="flex gap-[0.4rem] items-center">
                <Image src={heart} alt="heart" />
                <p className="font-medium text-[1.4rem] leading-[1.671rem] text-gray-800">{data.likeCount}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-medium text-[1.4rem] leading-[1.671rem] text-gray-400">{formatDate(data.createdAt)}</p>
            </div>
          </div>
          <div className="border border-gray-200 w-full mt-[1.2rem] mb-[1.2rem]" /> {/* 직선 */}
          <div className="flex">
            <p className="font-normal text-[1.6rem] leading-[2.56rem] text-gray-800">{data.description}</p>
          </div>
        </div>
      </div>
      {viewFeedback ? (
        <div className="mt-[4rem] ml-[1.4rem] mr-[1.4rem]">
          <p className="font-semibold text-[1.6rem] leading-[1.909rem]">Comments</p>
          <div className="p-[1.6rem] flex gap-[1.9rem] flex-col">
            {data.Feedback?.map((item: any, index: number) => (
              <div key={index} className="flex gap-[1.2rem] flex-col">
                <div className="flex gap-[0.8rem] items-center">
                  <Image src={profile} alt="profile" width={32} height={32} />
                  <div className="flex gap-[0.4rem] flex-col">
                    <p className="font-semibold text-[1.4rem] leading-[1.671rem] text-gray-800">{item.userNickname}</p>
                    <p className="font-semibold text-[1.2rem] leading-[1.432rem] text-gray-400">{formatDate(item.createdAt)}</p>
                  </div>
                </div>
                <p className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-700">{item.comment}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="flex gap-[0.4rem] items-center justify-center mt-[2rem] mb-[1.5rem]" onClick={handleViewFeedback}>
        <p className="font-medium text-[1.6rem] leading-[1.909rem]">{viewFeedback ? 'View Less' : 'View More'}</p>
        <Image src={viewFeedback ? arrowUp : arrowDown} alt="arrow" />
      </div>
    </div>
  );
}

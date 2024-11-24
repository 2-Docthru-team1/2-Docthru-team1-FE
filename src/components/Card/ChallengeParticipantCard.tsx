'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import comment from '@/../public/assets/icon_comment.png';
import heart from '@/../public/assets/icon_heart_inact_small.png';
import profile from '@/../public/assets/img_profile_member.png';
import food from '@/../public/temporaryAssets/Food.svg';
import { fetchChallengeStatus } from '@/api/challengeService';
import type { ChallengeParticipantStatusData, ChallengeParticipantStatusProps } from '@/interfaces/cardInterface';

export default function ChallengeParticipantCard({ initialData, type }: ChallengeParticipantStatusProps) {
  const [data, setData] = useState<ChallengeParticipantStatusData | null>(initialData || null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchedData = await fetchChallengeStatus();
  //     if (fetchedData && fetchedData.length > 0) {
  //       setData(fetchedData[0]);
  //     }
  //   };

  //   if (!initialData) {
  //     fetchData();
  //   } else {
  //     setData(initialData);
  //   }

  //   setLoading(false);
  // }, [initialData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const rol = data.role === 'normal' ? 'koo-koo' : data.role === 'admin' ? 'admin' : '';

  const borderClass = type === 'first' ? 'border-2 border-primary-beige' : 'border border-gray-200';

  // TODO: 현재 api 수정 이슈로 댓글 개수는 임의대로 작업하였습니다.

  return (
    <div className={`relative w-[27.8rem] h-[34.6rem] ${borderClass}`}>
      <div className="relative w-[27.45rem] h-[23.9rem]">
        {data.images.length > 0 && <Image src={food} alt="음식 이미지" layout="fill" objectFit="cover" />}
      </div>
      <div className="flex flex-col w-full h-[11rem] py-[1.3rem] px-[1.5rem] gap-[1.4rem]">
        <p className="font-bold text-[2rem] leading-[2.6rem] text-gray-700">{data.title}</p>
        <div className="flex justify-between">
          <div className="flex items-center gap-[1rem]">
            <Image src={profile} alt="프로필" width={24} height={24} />
            <div className="flex flex-col gap-[0.2rem]">
              <p className="font-medium text-[1.4rem] leading-[1.671rem] text-gray-800">{data.nickname}</p>
              <p className="font-medium text-[1.2rem] leading-[1.432rem] text-gray-500">{rol}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-[0.4rem]">
              <Image src={comment} alt="댓글" />
              {/* <p className="font-medium text-[1.2rem] leading-[1.8rem]">{data.Feedback.length}</p> */}
              <p className="font-medium text-[1.2rem] leading-[1.8rem]">15</p>
            </div>
            <div className="flex gap-[0.4rem]">
              <Image src={heart} alt="하트" />
              <p className="font-medium text-[1.2rem] leading-[1.8rem]">{data.likeCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

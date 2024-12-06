'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ChallengeParticipantStatusData, ChallengeParticipantStatusProps } from '@/interfaces/cardInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function ChallengeParticipantCard({ initialData, type }: ChallengeParticipantStatusProps) {
  const [data, setData] = useState<ChallengeParticipantStatusData | null>(initialData || null);

  if (!data) {
    return <div>No data available</div>;
  }

  const rol = data.owner.role === 'normal' ? 'koo-koo' : data.owner.role === 'admin' ? 'admin' : '';
  const borderClass = type === 'first' ? 'border-2 border-primary-beige' : 'border border-gray-200';
  const router = useRouter();

  const handleClick = (workId: string, challengeId: string) => {
    router.push(`/challengeList/${challengeId}/${workId}`);
  };

  return (
    <div className={`relative w-[27.8rem] h-[34.6rem] ${borderClass}`} onClick={() => handleClick(data.id, data.challengeId)}>
      <div className="relative w-[27.45rem] h-[23.9rem]">
        {data.images.length > 0 && <Image src={data.images[0].imageUrl} alt="음식 이미지" layout="fill" objectFit="cover" />}
      </div>
      <div className="flex flex-col w-full h-[11rem] py-[1.3rem] px-[1.5rem] gap-[1.4rem]">
        <p className="font-bold text-[2rem] leading-[2.6rem] text-gray-700">{data.title}</p>
        <div className="flex justify-between">
          <div className="flex items-center gap-[1rem]">
            <Image src={`${S3_BASE_URL}/img_profile_member.svg`} alt="프로필" width={24} height={24} />
            <div className="flex flex-col gap-[0.2rem]">
              <p className="font-medium text-[1.4rem] leading-[1.671rem] text-gray-800">{data.owner.name}</p>
              <p className="font-medium text-[1.2rem] leading-[1.432rem] text-gray-500">{rol}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-[0.4rem]">
              <Image src={`${S3_BASE_URL}/icon_comment.svg`} alt="댓글" width={16} height={16} />
              <p className="font-medium text-[1.2rem] leading-[1.8rem]">{data.feedbackCount}</p>
            </div>
            <div className="flex gap-[0.4rem]">
              <Image src={`${S3_BASE_URL}/icon_heart_inactive_large.svg`} alt="하트" width={16} height={16} />
              <p className="font-medium text-[1.2rem] leading-[1.8rem]">{data.likeCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

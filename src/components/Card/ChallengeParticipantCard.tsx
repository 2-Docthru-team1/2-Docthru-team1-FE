'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import comment from '@/../public/assets/icon_comment.png';
import heart from '@/../public/assets/icon_heart_inact_small.png';
import profile from '@/../public/assets/img_profile_member.png';
import food from '@/../public/temporaryAssets/Food.svg';
import { fetchChallengeStatus } from '@/api/ChallengeService';
import type { ChallengeParticipantStatusData, ChallengeParticipantStatusProps } from '@/interfaces/cardInterface';

export default function ChallengeParticipantCard({ initialData }: ChallengeParticipantStatusProps) {
  const [data, setData] = useState<ChallengeParticipantStatusData | null>(initialData ? initialData[0] : null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchChallengeStatus();
      if (fetchedData && fetchedData.length > 0) {
        setData(fetchedData[0]);
      }
      setLoading(false);
    };

    if (!initialData || initialData.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [initialData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 데이터가 없을 경우 처리
  if (!data) {
    return <div>No data available</div>;
  }

  const rol = data.role === 'normal' ? 'koo-koo' : data.role === 'admin' ? 'admin' : '';

  return (
    <div className="relative w-[27.8rem] h-[34.6rem]">
      <div className="relative w-[27.8rem] h-[23.9rem]">
        {data.images.length > 0 && <Image src={food} alt="음식 이미지" layout="fill" objectFit="cover" />}
      </div>
      <h2>{data.title}</h2>
      <div>
        <div>
          <Image src={profile} alt="프로필" />
          <div>
            <p>{data.nickname}</p>
            <p>{rol}</p>
          </div>
        </div>
        <div>
          <div>
            <Image src={comment} alt="댓글" />
            <p>{data.Feedback.length}</p>
          </div>
          <div>
            <Image src={heart} alt="하트" />
            <p>{data.likeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

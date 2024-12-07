'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchChallengeStatus, fetchChallenge_detail } from '@/api/challengeService';
import type { ChallengeParticipateStatusProps, ParticipantStatusData } from '@/interfaces/cardInterface';
import type { ChallengeDetailData } from '@/interfaces/challengelistInterface';
import ChallengeDetailContentCard from '../Card/ChallengeDetailContentCard';
import ChallengeMostLikedCard from '../Card/ChallengeMostLikedCard';
import ChallengeParticipateStatus from '../Card/ChallengeParticipateStatus';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function ChallengeDetailClient() {
  const { id } = useParams();

  const [medium, setMedium] = useState<ChallengeDetailData | null>(null);
  const [challengeStatusMedium, setChallengeStatusMedium] = useState<ChallengeParticipateStatusProps>({
    list: [],
    totalCount: 0
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (typeof id === 'string') {
      const getChallenge = async () => {
        const data = await fetchChallenge_detail(id);
        setMedium(data);
      };
      getChallenge();
    }
  }, [id]);

  useEffect(() => {
    if (typeof id === 'string') {
      const getChallengeStatus = async () => {
        const data = await fetchChallengeStatus(id, page);
        setChallengeStatusMedium(data);
      };
      getChallengeStatus();
    }
  }, [id, page]);

  if (!medium) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Image src={`${S3_BASE_URL}/loading.svg`} alt="loading" width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full md:p-[2.4rem] sm:p-[1.2rem] lg:justify-center lg:items-center">
      <div className="flex flex-col">
        <div className="flex">
          <ChallengeDetailContentCard
            type={medium.status}
            data={{
              title: medium.title,
              mediaType: medium.mediaType,
              description: medium.description,
              id: medium.id,
              requestUser: {
                id: medium.requestUser.id,
                name: medium.requestUser.name
              },
              deadline: medium.deadline,
              imageUrl: medium.imageUrl,
              imageUrl2: medium.imageUrl2,
              embedUrl: medium.embedUrl
            }}
          />
        </div>
        {medium.status === 'finished' && (
          <div className="mt-[4rem] flex sm:justify-center lg:justify-start">
            {challengeStatusMedium.list.length > 0 && (
              <ChallengeMostLikedCard
                data={{
                  title: challengeStatusMedium.list[0].title,
                  owner: {
                    id: challengeStatusMedium.list[0].owner.id,
                    email: challengeStatusMedium.list[0].owner.email,
                    name: challengeStatusMedium.list[0].owner.name,
                    role: challengeStatusMedium.list[0].owner.role
                  },
                  id: challengeStatusMedium.list[0].id,
                  likeCount: challengeStatusMedium.list[0].likeCount,
                  description: challengeStatusMedium.list[0].content,
                  createdAt: challengeStatusMedium.list[0].createdAt,
                  images: challengeStatusMedium.list[0].images
                }}
              />
            )}
          </div>
        )}
        <div className="mt-[4rem] flex mb-[2rem] sm:justify-center lg:justify-start">
          <ChallengeParticipateStatus list={challengeStatusMedium.list} totalCount={challengeStatusMedium.totalCount} />
        </div>
      </div>
    </div>
  );
}

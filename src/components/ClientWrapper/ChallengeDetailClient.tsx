'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchChallengeStatus, fetchChallenge_detail } from '@/api/challengeService';
import type { ChallengeParticipateStatusProps, ParticipantStatusData } from '@/interfaces/cardInterface';
import type { ChallengeDetailData } from '@/interfaces/challengelistInterface';
import ChallengeDetailContentCard from '../Card/ChallengeDetailContentCard';
import ChallengeMostLikedCard from '../Card/ChallengeMostLikedCard';
import ChallengeParticipateStatus from '../Card/ChallengeParticipateStatus';

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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex mx-auto flex-col">
        <div className="mt-[2rem] flex">
          <ChallengeDetailContentCard
            type={medium.status as 'onGoing' | 'finished'}
            data={{
              title: medium.title,
              mediaType: medium.mediaType as 'youtube' | 'blog' | 'recipeWeb' | 'socialMedia',
              description: medium.description,
              ownerId: medium.ownerId
            }}
          />
        </div>
        {medium.status === 'finished' && (
          <div className="mt-[4rem] flex">
            {challengeStatusMedium.list.length > 0 && (
              <ChallengeMostLikedCard
                data={{
                  title: challengeStatusMedium.list[0].title,
                  ownerId: challengeStatusMedium.list[0].owner.id,
                  role: challengeStatusMedium.list[0].owner.role,
                  likeCount: challengeStatusMedium.list[0].likeCount,
                  description: challengeStatusMedium.list[0].content,
                  // Feedback: challengeStatusMedium.list[0].owner,
                  createdAt: challengeStatusMedium.list[0].createdAt
                }}
              />
            )}
          </div>
        )}
        <div className="mt-[4rem] flex mb-[2rem]">
          <ChallengeParticipateStatus list={challengeStatusMedium.list} totalCount={challengeStatusMedium.totalCount} />
        </div>
      </div>
    </div>
  );
}

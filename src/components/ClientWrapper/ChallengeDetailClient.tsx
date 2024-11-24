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
  const [challengeStatusMedium, setChallengeStatusMedium] = useState<{
    list: ParticipantStatusData[];
    totalCount: number;
  }>({ list: [], totalCount: 0 });

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
        console.log(data, 'Challenge Status Data');
        setChallengeStatusMedium({
          list: data.list,
          totalCount: data.totalCount
        });
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
            type={medium.status as 'ongoing' | 'finished'}
            data={{
              title: medium.title,
              mediaType: medium.mediaType as 'Youtube' | 'Blog' | 'Recipe Web' | 'Social Media',
              description: medium.description,
              ownerId: medium.ownerId
            }}
          />
        </div>
        {medium.status === 'finished' && (
          <div className="mt-[4rem] flex">
            {challengeStatusMedium.length > 0 && (
              <ChallengeMostLikedCard
                data={{
                  title: challengeStatusMedium[0].title,
                  ownerId: challengeStatusMedium[0].ownerId,
                  role: challengeStatusMedium[0].role,
                  likeCount: challengeStatusMedium[0].likeCount,
                  description: challengeStatusMedium[0].description,
                  Feedback: challengeStatusMedium[0].Feedback,
                  createdAt: challengeStatusMedium[0].createdAt
                }}
              />
            )}
          </div>
        )}
        <div className="mt-[4rem] flex mb-[2rem]">
          <ChallengeParticipateStatus data={challengeStatusMedium} />
        </div>
      </div>
    </div>
  );
}

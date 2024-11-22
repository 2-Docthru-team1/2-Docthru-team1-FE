'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchChallengeStatus, fetchChallenge_detail } from '@/api/challengeService';
import type { ParticipantStatusData } from '@/interfaces/cardInterface';
import type { ChallengeDetailData } from '@/interfaces/challengelistInterface';
import ChallengeDetailContentCard from '../Card/ChallengeDetailContentCard';
import ChallengeParticipateStatus from '../Card/ChallengeParticipateStatus';

export default function ChallengeDetailClient() {
  const { id } = useParams();

  const [medium, setMedium] = useState<ChallengeDetailData | null>(null);
  const [challengeStatusMedium, setChallengeStatusMedium] = useState<ParticipantStatusData[]>([]);

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
        const data = await fetchChallengeStatus();
        console.log('status', data);
        setChallengeStatusMedium(data);
      };
      getChallengeStatus();
    }
  }, [id]);

  if (!medium) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
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
      <div>
        <ChallengeParticipateStatus data={challengeStatusMedium} />
      </div>
    </div>
  );
}

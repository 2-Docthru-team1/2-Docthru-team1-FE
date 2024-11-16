import type { ChallengeData } from '@/interfaces/challengeInterface';
import ChallengeCard from './ChallengeCard';

interface ChallengeListProps {
  challenges: ChallengeData[];
}

export default function ChallengeList({ challenges }: ChallengeListProps) {
  if (!challenges || challenges.length === 0) {
    return <div className="text-center text-gray-500">No challenges available</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {challenges.map((challenge, index) => (
        <ChallengeCard key={index} data={challenge} />
      ))}
    </div>
  );
}

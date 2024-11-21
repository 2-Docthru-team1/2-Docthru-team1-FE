import type { ChallengeDetailContentCardProps } from '@/interfaces/cardInterface';
import ChipCard from '../Chip/ChipCard';
import ChipCategory from '../Chip/ChipCategory';

export default function ChallengeDetailContentCard({ type, data }: ChallengeDetailContentCardProps) {
  return (
    <div>
      <ChipCard type={type} />
      <p>{data.title}</p>
      <ChipCategory mediaType={data.mediaType} />
      <p>{data.content}</p>
    </div>
  );
}

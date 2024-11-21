import type { ChallengeData, MonthlyRankerCard } from './cardInterface';

export interface ChallengeListClientProps {
  initialData: ChallengeData[];
  rankerData: MonthlyRankerCard[];
  userId: string;
  role: 'admin' | 'normal';
}

export interface ChallengeDetailData {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleteAt: string | null;
  title: string;
  description: string;
  status: string;
  deadline: string;
  embedUrl: string;
  imageUrl: string[];
  mediaType: string;
  requestUserId: string;
}

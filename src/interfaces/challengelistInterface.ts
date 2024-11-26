import type { ChallengeData, MonthlyChallengeData, MonthlyRankerCard } from './cardInterface';

export interface ChallengeListClientProps {
  adminchallengeData: MonthlyChallengeData[];
  challengeData: ChallengeData[];
  rankerData: MonthlyRankerCard[];
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
  imageUrl: string;
  imageUrl2: string | null;
  mediaType: string;
  requestUserId: string;
  ownerId: string;
}

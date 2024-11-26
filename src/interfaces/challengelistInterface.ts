import type { ChallengeData, MonthlyChallengeData, MonthlyRankerCard, requestUserData } from './cardInterface';

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
  imageUrl: string[];
  mediaType: string;
  requestUser: requestUserData;
  ownerId: string;
}

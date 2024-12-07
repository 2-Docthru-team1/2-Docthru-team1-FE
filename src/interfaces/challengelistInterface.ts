import type { ChallengeData, MonthlyChallengeData, MonthlyRankerCard, requestUserData } from './cardInterface';

export interface ChallengeListClientProps {
  adminchallengeData: MonthlyChallengeData[];
}

export interface ChallengeDetailData {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleteAt: string | null;
  title: string;
  description: string;
  status: 'onGoing' | 'finished';
  deadline: string;
  embedUrl: string;
  imageUrl: string;
  imageUrl2: string;
  mediaType: 'youtube' | 'blog' | 'recipeWeb' | 'socialMedia';
  requestUser: requestUserData;
  ownerId: string;
}

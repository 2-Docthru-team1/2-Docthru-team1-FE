import type { UserData } from './userInterface';

export interface RecipeCardProps {
  data: RecipeData | null;
}

export interface RecipeData {
  id: string;
  title: string;
  likeCount: number;
  category: string;
  images: string[];
}

export interface DetailTextCardProps {
  type: 'ingredient' | 'direction' | 'nutrition' | 'benefit';
  content: string[] | NutritionContent;
}

export interface NutritionContent {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sugars: number;
  sodium: number;
  fiber: number;
}

export interface ChallengeParticipantStatusProps {
  initialData: ChallengeParticipantStatusData;
  type: 'first' | 'etc';
}

export interface ChallengeParticipantStatusData {
  title: string;
  Feedback: string[];
  likeCount: number;
  nickname: string;
  images: string[];
  role: string;
}

export interface ChallengeCardProps {
  data: ChallengeData | null;
  userId: string;
  role: 'admin' | 'normal';
}

export interface ChallengeData {
  id: string;
  title: string;
  mediaType: 'Youtube' | 'Blog' | 'Recipe Web' | 'Social Media';
  status: 'ongoing' | 'finished' | 'canceled';
  deadline: string;
  requestUserId: string;
  totalLikes: number;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyChallengeCardProps {
  data: MonthlyChallengeData | null;
  role: 'admin' | 'normal';
}

export interface MonthlyChallengeData {
  id: string;
  title: string;
  mediaType: 'Youtube' | 'Blog' | 'Recipe Web' | 'Social Media';
  status: 'ongoing' | 'finished'; // NOTE | 'aborted' 아마 필요 없겠지만, 참고.
  deadline: string;
}

export interface MonthlyRankerCardProps {
  data: MonthlyRankerCard[];
}

export interface MonthlyRankerCard {
  id: string;
  name: string;
  profileImage?: string;
  totalLikes: number;
  role: string;
}

export interface ChallengeParticipateStatusProps {
  data: ParticipantStatusData[];
}

export interface ParticipantStatusData {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleteAt: string | null;
  title: string;
  content: string;
  likeCount: number;
  likeUsers: string[];
  Feedback: string[];
  ownerId: string;
  challengeId: string;
  images: string[];
  nickname: string;
  role: string;
}

export interface ChallengeDetailContentCardProps {
  type: 'ongoing' | 'finished';
  data: ChallengeDetailContentCardData;
}

export interface ChallengeDetailContentCardData {
  title: string;
  mediaType: 'Youtube' | 'Blog' | 'Recipe Web' | 'Social Media';
  content: string;
}

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

export interface MonthlyChallengeCardProps {
  data: MonthlyChallengeCard | null;
  user: UserData;
}

export interface MonthlyChallengeCard {
  id: string;
  title: string;
  mediaType: 'Youtube' | 'Blog' | 'Recipe Web' | 'Social Media';
  status: 'ongoing' | 'finished';
  deadline: string;
  requestUserId: string;
}

export interface MonthlyRankerCardProps {
  data: MonthlyRankerCard[];
}

export interface MonthlyRankerCard {
  id: string;
  name: string;
  profileImage: string;
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

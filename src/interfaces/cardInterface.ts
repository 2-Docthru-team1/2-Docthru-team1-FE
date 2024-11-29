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
  id: string;
  title: string;
  feedbackCount: number;
  likeCount: number;
  owner: ownerData;
  images: { imageUrl: string }[];
}

export interface ownerData {
  email?: string;
  id?: string;
  name: string;
  role?: string;
}

export interface ChallengeCardProps {
  data: ChallengeData | null;
  userId: string | null;
  role: 'admin' | 'normal' | null;
}

export interface ChallengePaginationProps {
  list: ChallengeData[];
  totalCount: number;
}

export interface ChallengeData {
  id: string;
  title: string;
  mediaType: 'recipeWeb' | 'socialMedia' | 'youtube' | 'blog';
  status: 'onGoing' | 'finished';
  deadline: string;
  requestUser: RequestUser;
  totalLikes: number;
  createdAt: string;
  updatedAt: string;
}

export interface RequestUser {
  id: string;
  name: string;
}

export interface MonthlyChallengeCardProps {
  data: MonthlyChallengeData | null;
  role: 'admin' | 'normal' | null;
}

export interface MonthlyChallengeData {
  id: string;
  title: string;
  mediaType: 'youtube' | 'blog' | 'socialMedia' | 'recipeWeb';
  status: 'onGoing' | 'finished';
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
  list: ParticipantStatusData[];
  totalCount: number;
}

export interface ParticipantStatusData {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  content: string;
  likeCount: number;
  // likeUsers: string[];
  feedbackCount: number;
  owner: ownerData;
  challengeId: string;
  images: { imageUrl: string }[];
  // nickname: string;
  // role: string;
}

export interface ChallengeDetailContentCardProps {
  type: 'onGoing' | 'finished';
  data: ChallengeDetailContentCardData;
}

export interface ChallengeDetailContentCardData {
  title: string;
  mediaType: 'recipeWeb' | 'socialMedia' | 'youtube' | 'blog';
  description: string;
  id: string;
  requestUser: requestUserData;
  deadline: string;
}

export interface requestUserData {
  id: string;
  name: string;
}

export interface ChallengeMostLikedCardProps {
  data: ChallengeMostLikedCardData;
}

export interface ChallengeMostLikedCardData {
  title: string;
  likeCount: number;
  description: string;
  createdAt: string;
  owner: ownerData;
  Feedback?: string[];
  id: string;
}

export interface FeedbackData {
  userNickname: string;
  createdAt: string;
  comment: string;
}

export interface ChallengeMostLikedCardWorksProps {
  totalCount: number;
  list: ChallengeMostLikedCardWorksData[];
}

export interface ChallengeMostLikedCardWorksData {
  content: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  owner: ownerData;
  ownerId: string;
  updatedAt: string;
  workId: string;
}

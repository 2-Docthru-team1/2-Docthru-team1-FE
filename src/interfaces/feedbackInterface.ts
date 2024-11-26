import type { UserData } from './userInterface';

export interface FeedbackData {
  id: string;
  createdAt: string;
  content: string;
  ownerId: string;
  owner: {
    name: string;
  };
}

export interface FeedbackCardProps {
  comments: FeedbackData[];
  user: UserData;
}

export interface FeedbackResponse {
  list: FeedbackData[];
  totalCount: number;
}

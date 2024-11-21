import type { UserData } from './userInterface';

export interface FeedbackData {
  id: string;
  createdAt: string;
  content: string;
  ownerId: string;
  userName: string;
}

export interface FeedbackCardProps {
  comments: FeedbackData[];
  user: UserData;
}

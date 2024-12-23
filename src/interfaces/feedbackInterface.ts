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
  userId: string | null;
  userRole: 'admin' | 'normal' | null;
}

export interface FeedbackResponse {
  list: FeedbackData[];
  totalCount: number;
}

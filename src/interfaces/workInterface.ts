import type { UserData } from './userInterface';

export interface WorkDetailData {
  challengeId: string;
  id: string;
  title: string;
  content: string;
  likeCount: number;
  createdAt: string;
  images: { imageUrl: string }[];
  owner: {
    id: string;
    name: string;
    role: string;
  };
  workLikes: { userId: string }[];
}

export interface WorkDataProps {
  data: WorkDetailData | null;
  userId: string | null;
  userRole: 'admin' | 'normal' | null;
}

export interface WorkInputProps {
  data: WorkDetailData | null;
}

export interface WorkType {
  title: string;
  content: string;
  images: { imageUrl: string }[];
}

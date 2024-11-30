import type { UserData } from './userInterface';

export interface WorkDetailData {
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
  likeUsers: {
    id: string;
  };
}

export interface WorkDataProps {
  data: WorkDetailData | null;
  user: UserData;
}

export interface WorkInputProps {
  data: WorkDetailData | null;
}

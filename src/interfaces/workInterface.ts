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
}

export interface WorkDataProps {
  data: WorkDetailData | null;
  userId: string | null;
}

export interface WorkInputProps {
  data: WorkDetailData | null;
}

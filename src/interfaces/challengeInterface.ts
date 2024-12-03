export interface StylesState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  alignment: 'left' | 'center' | 'right';
  currentColor: string;
  isBulletList: boolean;
  isNumberList: boolean;
}

export interface SavedSelection {
  startContainer: Node;
  startOffset: number;
  endContainer: Node;
  endOffset: number;
}

export interface ChallengeApplicationDetailBody {
  type: 'normal' | 'admin';
  data: ChallengeApplicationDetailBodyData;
}

export interface ChallengeApplicationDetailBodyData {
  id: string;
  embedUrl: string;
  status: 'pending' | 'finished' | 'denied' | 'onGoing' | 'canceled' | 'aborted';
}

export interface ChallengeApplicationDetailHeader {
  type: 'normal' | 'admin';
  data: ChallengeApplicationDetailHeaderData;
}

export interface ChallengeApplicationDetailHeaderData {
  id: string;
  number: string;
  title: string;
  mediaType: 'recipeWeb' | 'socialMedia' | 'youtube' | 'blog';
  description: string;
  requestUser: requestUser;
  deadline: string;
  imageUrl: string;
  imageUrl2: string;
  embedUrl: string;
  status: 'pending' | 'finished' | 'denied' | 'onGoing' | 'canceled' | 'aborted';
  updatedAt: string;
}

export interface requestUser {
  id: string;
  name: string;
}

export interface ChallengeHeaderProps {
  onSubmit: () => void;
}

export interface ChallengeBodyProps {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export interface MyRequestData {
  totalCount: number;
  list: MyRequestDataDetail[];
}

export interface MyRequestDataDetail {
  id: string;
  number: number;
  mediaType: 'recipeWeb' | 'socialMedia' | 'youtube' | 'blog';
  title: string;
  updatedAt: string;
  deadline: string;
  requestUser: requestUser;
  totalLikes: number;
  createdAt: string;
  status: 'pending' | 'finished' | 'denied' | 'onGoing' | 'canceled' | 'aborted';
}

export interface MyParticipateData {
  totalCount: number;
  list: MyParticipateDataDetail[];
}

export interface MyParticipateDataDetail {
  id: string;
  number: number;
  mediaType: 'recipeWeb' | 'socialMedia' | 'youtube' | 'blog';
  title: string;
  updatedAt: string;
  deadline: string;
  requestUser: requestUser;
  totalLikes: number;
  createdAt: string;
  status: 'finished' | 'onGoing';
}

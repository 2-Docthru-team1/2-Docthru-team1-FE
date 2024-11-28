export interface ChallengeApplicationClientProps {
  totalCount: number;
  list: ChallengeApplicationBodyData[];
}

export interface ChallengeApplicationBodyData {
  number: number;
  mediaType: 'recipeWeb' | 'socialMedia' | 'youtube' | 'blog';
  title: string;
  updatedAt: string;
  deadline: string;
  status: 'pending' | 'finished' | 'denied' | 'onGoing' | 'canceled' | 'aborted';
}

export interface ChallengeApplicationBodyProps {
  data: ChallengeApplicationBodyData[];
}

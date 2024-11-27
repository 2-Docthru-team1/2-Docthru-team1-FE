export interface ChallengeApplicationBodyProps {
  data: ChallengeApplicationBodyData;
}

export interface ChallengeApplicationBodyData {
  number: number;
  mediaType: 'recipeWeb' | 'socialMedia' | 'youtube' | 'blog';
  updatedAt: string;
  deadline: string;
  status: 'pending' | 'finished' | 'denied' | 'onGoing' | 'canceled' | 'aborted';
}

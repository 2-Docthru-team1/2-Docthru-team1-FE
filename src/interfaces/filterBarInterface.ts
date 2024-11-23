export interface FilterBarProps {
  type: 'recipe' | 'challenge' | 'admin';
}

export interface Option {
  label: string;
  value: string;
}

export interface ChallengeOption {
  view: Option[];
  media: Option[];
  status: Option[];
}

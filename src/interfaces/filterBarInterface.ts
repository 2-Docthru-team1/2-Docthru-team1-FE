export interface FilterBarProps {
  type: 'recipe' | 'admin' | 'challenge';
  onKeywordChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFilterApply: (orderBy: string, mediaType: string[], status: string) => void;
}

export interface Option {
  label: string;
  value: string;
}

export interface ChallengeOption {
  orderBy: Option[];
  mediaType: Option[];
  status: Option[];
}

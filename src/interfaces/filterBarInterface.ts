export interface FilterBarProps {
  type: 'admin' | 'challenge';
  onKeywordChange: (value: string) => void;
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

export interface RecipeFilterBarProps {
  onFilterApply: (category: string) => void;
}

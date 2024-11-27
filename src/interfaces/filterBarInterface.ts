export interface FilterBarProps {
  type: 'recipe' | 'admin' | 'challenge';
  onKeywordChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFilterApply: () => void;
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

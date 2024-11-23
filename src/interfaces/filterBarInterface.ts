export interface FilterBarProps {
  type: 'recipe' | 'admin' | 'challenge';
  keyword: string;
  category: string;
  onKeywordChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFilterApply: () => void;
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

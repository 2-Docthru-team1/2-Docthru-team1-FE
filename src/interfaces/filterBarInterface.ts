export interface FilterBarProps {
  type: 'recipe' | 'admin';
  keyword: string;
  category: string;
  onKeywordChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFilterApply: () => void;
}

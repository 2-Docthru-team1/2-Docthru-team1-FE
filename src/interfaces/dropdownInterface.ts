import type { ReactNode } from 'react';
import type { ChallengeOption, Option } from './filterBarInterface';

export interface DropdownProps {
  isOpen: boolean;
  items: Option[] | ChallengeOption[];
  type: 'language' | 'recipe' | 'admin' | 'challenge';
  selectedCuisine?: string;
  selectedMedia?: string[];
  selectedStatus?: string;
  onSelect: OnSelectFunction;
}

export type CategoryType = 'cuisine' | 'media' | 'status';

export type OnSelectFunction = {
  (value: string, category: CategoryType): void;
  (value: string): void;
};

export interface DropdownItem {
  label: string;
  value: string;
}

export interface CancelDropdownProps {
  onCancel: () => void;
  children: ReactNode;
}

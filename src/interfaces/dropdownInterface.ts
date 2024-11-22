import type { ReactNode } from 'react';
import type { ChallengeOption, Option } from './filterBarInterface';

export interface DropdownProps {
  isOpen: boolean;
  items: Option[] | ChallengeOption[];
  onSelect: (value: string, category: 'cuisine' | 'media' | 'status') => void;
  type: 'language' | 'recipe' | 'admin' | 'challenge';
  selectedCuisine?: string;
  selectedMedia?: string[];
  selectedStatus?: string;
}

export interface DropdownItem {
  label: string;
  value: string;
}

export interface CancelDropdownProps {
  onCancel: () => void;
  children: ReactNode;
}

import type { ReactNode } from 'react';
import type { ChallengeOption, Option } from './filterBarInterface';

export interface DropdownProps {
  isOpen: boolean;
  items: Option[] | ChallengeOption[];
  type: 'language' | 'recipe' | 'admin' | 'challenge';
  selectedView?: string;
  selectedMedia?: string[];
  selectedStatus?: string;
  onSelect: OnSelectFunction;
}

export type CategoryType = 'view' | 'media' | 'status';

export type OnSelectFunction = (value: string, category?: CategoryType) => void;

export interface DropdownItem {
  label: string;
  value: string;
}

export interface CancelDropdownProps {
  onCancel: () => void;
  children: ReactNode;
}

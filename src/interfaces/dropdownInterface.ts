import type { ReactNode } from 'react';
import type { ChallengeOption, Option } from './filterBarInterface';

export interface DropdownProps {
  isOpen: boolean;
  items: Option[] | ChallengeOption[];
  type: 'language' | 'recipe' | 'admin' | 'challenge';
  onSelect: OnSelectFunction;
  onApply: (view: string, media: string[], status: string) => void;
  onClose: () => void;
}

export type CategoryType = 'view' | 'media' | 'status';

export type OnSelectFunction = (value: string, category?: CategoryType) => void;

export interface DropdownItem {
  label: string;
  value: string;
}

export interface CancelDropdownProps {
  onCancel: (event: React.MouseEvent) => void | Promise<void>;
  children: ReactNode;
  abortReason?: string;
  setAbortReason?: (reason: string) => void;
}

export interface RecipeDropdownProps {
  items: Option[];
  onApply: (option: Option) => void;
}

import type { ReactNode } from 'react';

export interface DropdownProps {
  isOpen: boolean;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  type: 'language' | 'recipe' | 'admin';
}

export interface DropdownItem {
  label: string;
  value: string;
}

export interface CancelDropdownProps {
  onCancel: () => void;
  children: ReactNode;
}

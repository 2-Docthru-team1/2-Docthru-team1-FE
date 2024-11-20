export interface ClosableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ConfirmModalProps {
  onCancel: () => void;
  onDelete: () => void;
}

export interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

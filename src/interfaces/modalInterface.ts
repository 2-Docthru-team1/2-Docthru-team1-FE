export interface ClosableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ConfirmModalProps {
  onCancel: () => void;
  onDelete?: () => void;
  role?: string | null;
  abortReason?: string;
  setAbortReason?: (reason: string) => void;
  onApprove?: () => void;
}

export interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export interface NotificationModalProps {
  notifications: Notification[];
  onClose: () => void;
  onNotificationClick: (challengeId: string, workId: string) => void;
}

export interface Notification {
  challengeId: string;
  message: string;
  createdAt: string;
  id: string;
  isRead: boolean;
  workId?: string;
}

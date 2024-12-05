export interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

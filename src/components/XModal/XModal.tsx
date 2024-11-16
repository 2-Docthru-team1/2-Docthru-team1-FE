import Image from 'next/image';
import toggleDown from '@/../public/assets/ic_toggle_down.png';
import close from '@/../public/assets/icon_close.png';
import type { XModalProps } from '@/interfaces/modalInterface';

export default function XModal({ isOpen, onClose }: XModalProps) {
  if (!isOpen) return null;
  return (
    <div>
      <div>
        <p>Select your language</p>
        <Image src={close} alt="X" />
      </div>
      <div>
        <p>Language</p>
        <Image src={toggleDown} alt="아래 화살표" />
      </div>
      <button>Apply</button>
    </div>
  );
}

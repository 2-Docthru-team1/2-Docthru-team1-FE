import Image from 'next/image';
import type { ImageModalProps } from '@/interfaces/modalInterface';

export default function ImageEnlargeModal({ src, alt, onClose }: ImageModalProps) {
  return (
    <div className="w-full h-full fixed inset-0 bg-gray-900 bg-opacity-50 z-2" onClick={onClose}>
      <div
        className="releative fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70.7rem] h-[74.1rem]"
        onClick={e => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill className="object-cover" /> {/* src={data.images[currentOrder]} */}
      </div>
    </div>
  );
}

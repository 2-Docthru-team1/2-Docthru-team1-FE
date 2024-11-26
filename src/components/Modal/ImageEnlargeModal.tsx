import Image from 'next/image';
import type { ImageModalProps } from '@/interfaces/modalInterface';

export default function ImageEnlargeModal({ src, alt, onClose }: ImageModalProps) {
  return (
    <div className="w-full h-full fixed inset-0 bg-gray-900 bg-opacity-50 z-10" onClick={onClose}>
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  w-[70.7rem] h-[74.1rem] "
        onClick={e => e.stopPropagation()}
      >
        <Image src={src} alt={alt} className="object-cover" width={600} height={600} /> {/* src={data.images[currentOrder]} */}{' '}
      </div>{' '}
    </div>
  );
}

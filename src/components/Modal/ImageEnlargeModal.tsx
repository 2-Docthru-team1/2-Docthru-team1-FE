import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ImageModalProps } from '@/interfaces/modalInterface';

export default function ImageEnlargeModal({ src, alt, onClose }: ImageModalProps) {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 744);
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return (
    <div className="w-full h-full fixed inset-0 bg-gray-900 bg-opacity-50 z-10" onClick={onClose}>
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center "
        style={{
          width: isSmallScreen ? '18rem' : '70.7rem',
          height: isSmallScreen ? '20rem' : '74.1rem'
        }}
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          className="object-cover"
          width={isSmallScreen ? 285 : 600}
          height={isSmallScreen ? 285 : 600}
        />
      </div>
    </div>
  );
}

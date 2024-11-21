import Image from 'next/image';
import { useState } from 'react';
import nextImage from '@/../public/assets/btn_photo_swipe.png';
import food from '@/../public/temporaryAssets/Food.svg';
import type { ChallengeDetailContentCardProps } from '@/interfaces/cardInterface';
import ChipCard from '../Chip/ChipCard';
import ChipCategory from '../Chip/ChipCategory';
import ImageEnlargeModal from '../Modal/ImageEnlargeModal';

export default function ChallengeDetailContentCard({ type, data }: ChallengeDetailContentCardProps) {
  enum ImgOrder {
    first = 0,
    second = 1
  }

  const [currentOrder, setCurrentOrder] = useState<ImgOrder>(ImgOrder.first);
  const [isOpen, setIsOpen] = useState(false);

  const handleNext = () => {
    setCurrentOrder(prevOrder => (prevOrder === ImgOrder.first ? ImgOrder.second : ImgOrder.first));
  };

  const openImg = () => setIsOpen(true);

  const closeImg = () => setIsOpen(false);

  return (
    <div>
      <ChipCard type={type} />
      <p>{data.title}</p>
      <ChipCategory mediaType={data.mediaType} />
      <p>{data.content}</p>
      <div className="mr-[0.3rem] w-[47.6rem] h-[47.9rem] relative cursor-pointer">
        <Image src={food} alt="작업물 이미지" fill className="object-cover" onClick={openImg} />
      </div>
      <div className="flex items-center">
        <Image src={nextImage} alt="다음 이미지 버튼" onClick={handleNext} className="cursor-pointer" />
      </div>
      {isOpen && <ImageEnlargeModal src={food} alt="작업물 이미지" onClose={closeImg} />}
    </div>
  );
}

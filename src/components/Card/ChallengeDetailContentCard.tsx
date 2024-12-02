import Image from 'next/image';
import { useState } from 'react';
import nextImage from '@/../public/assets/btn_photo_swipe.png';
import profileMem from '@/../public/assets/img_profile_member.png';
import food from '@/../public/temporaryAssets/Food.svg';
import type { ChallengeDetailContentCardProps } from '@/interfaces/cardInterface';
import ChipCard from '../Chip/ChipCard';
import ChipCategory from '../Chip/ChipCategory';
import ImageEnlargeModal from '../Modal/ImageEnlargeModal';
import OptionBox from '../OptionBox/OptionBox';

export default function ChallengeDetailContentCard({ type, data }: ChallengeDetailContentCardProps) {
  const [modalImage, setModalImage] = useState<string>('');
  const [modalAlt, setModalAlt] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(data);

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const renderImage = (imageUrl: string, alt: string) => {
    if (!imageUrl || imageUrl.trim() === '' || !isValidUrl(imageUrl)) {
      return <p className="text-gray-500 text-sm italic"></p>;
    }
    return (
      <div className="relative w-[34.3rem] h-[29.4rem] overflow-hidden">
        <Image
          src={imageUrl}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="cursor-pointer"
          onClick={() => handleImageClick(imageUrl, alt)}
        />
      </div>
    );
  };

  const handleImageClick = (imageUrl: string, alt: string) => {
    setModalImage(imageUrl);
    setModalAlt(alt);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col">
        <div className="w-full flex md:justify-between sm:flex-col md:flex-row">
          <div className="flex flex-col">
            <div className="flex flex-col mb-[2rem] lg:w-[87.4rem] md:w-[39.9rem]">
              <ChipCard type={type} />
              <div className="mt-[1.6rem] lg:w-[87.4rem] md:w-[39.9rem] gap-[1.6rem] flex flex-col">
                <p className="font-semibold text-[2.4rem] leading-[2.864rem] text-gray-700">{data.title}</p>
                <div>
                  <ChipCategory mediaType={data.mediaType} />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[86.5rem] lg:w-[86.5rem] md:w-[39.7rem] sm:w-[34.5rem] gap-[2.4rem]">
              <p className="font-normal text-[1.6rem] md:w-[39.9rem] leading-[2.08rem] text-gray-700">{data.description}</p>
              <div className="flex items-center gap-[0.8rem] md:w-[39.9rem]">
                <Image src={profileMem} alt="프로필" width={24} height={24} />
                <p className="font-medium text-[1.2rem] leading-[1.432rem] text-gray-800">{data.requestUser.name}</p>
              </div>
            </div>
          </div>
          <div className="lg:mt-[6.8rem] md:h-[17.6rem] sm:justify-center sm:flex sm:mt-[2rem]">
            <OptionBox type={type} id={data.id} date={data.deadline} />
          </div>
        </div>
        <div className="flex items-center w-full h-[29.4rem] gap-[2rem] sm:flex-col md:flex-row">
          {renderImage(data.imageUrl, 'Image 1')}
          {renderImage(data.imageUrl2, 'Image 2')}
        </div>
      </div>
      {isModalOpen && <ImageEnlargeModal src={modalImage} alt={modalAlt} onClose={handleModalClose} />}
    </div>
  );
}

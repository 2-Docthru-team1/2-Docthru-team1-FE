'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import clock from '@/../public/assets/icon_deadline_clock_large.png';
import toggle from '@/../public/assets/icon_kebab_toggle.png';
import profile from '@/../public/assets/img_profile_member.png';
import { fetchChallengeAbortReason } from '@/api/challengeService';
import type { ChallengeApplicationDetailHeader } from '@/interfaces/challengeInterface';
import ChipCategory from '../Chip/ChipCategory';
import ImageEnlargeModal from '../Modal/ImageEnlargeModal';

export default function ChallengeApplicationDetailHeader({ data }: ChallengeApplicationDetailHeader) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>('');
  const [modalAlt, setModalAlt] = useState<string>('');
  const [abortReason, setAbortReason] = useState('');

  useEffect(() => {
    const getChallengeAbortReason = async () => {
      const response = await fetchChallengeAbortReason(String(data.id));
      console.log(response);
      setAbortReason(response.content);
    };

    getChallengeAbortReason();
  }, [data.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yyyy-MM-dd');
  };

  const formatUpdatedDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yy/MM/dd HH:mm');
  };

  const renderImage = (imageUrl: string, alt: string) => {
    if (!imageUrl || imageUrl.trim() === '') {
      return null;
    }
    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={343}
        height={294}
        className="cursor-pointer"
        onClick={() => handleImageClick(imageUrl, alt)}
      />
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
    <div className="w-[120rem] items-center justify-center flex flex-col">
      <div className="flex flex-col w-full gap-[1.6rem]">
        {(data.status === 'denied' || data.status === 'aborted') && (
          <>
            <div className="w-full flex flex-col items-center mt-[1.2rem]">
              <p className="w-full h-[3.5rem] rounded-[1.75rem] bg-[#FFF0F0] flex items-center justify-center font-semibold text-[1.6rem] leading-[1.909rem] text-error-red">
                This challenge has been declined
              </p>
              <div className="flex flex-col items-end bg-primary-white w-full h-[11.7rem] rounded-[0.8rem] border border-gray-200 mt-[2.4rem] py-[1.8rem] px-[3rem]">
                <div className="flex flex-col items-center justify-center w-full">
                  <p className="font-semibold text-[1.4rem] leading-[1.671rem] text-gray-800">Reason for declining</p>
                  <p className="pt-[1.2rem] font-medium text-[1.6rem] leading-[1.909rem] text-gray-700">{abortReason}</p>
                </div>
                <p className="mt-[1.2rem] font-normal text-[1.4rem] leading-[1.671rem] text-gray-500">
                  {formatUpdatedDate(data.updatedAt)}
                </p>
              </div>
            </div>
            <div className="border border-gray-200 w-full mt-[1.2em]" />
          </>
        )}
        {(data.status === 'finished' || data.status === 'onGoing') && (
          <>
            <div className="flex w-full items-center justify-center h-[3.5rem] rounded-[1.75rem] bg-[#DFF0FF] mt-[1.2rem]">
              <p className="font-semibold text-[1.6rem] leading-[1.909rem] text-[#4095DE]">This challenge has been approved</p>
            </div>
            <div className="border border-gray-200 w-full mt-[2.4rem] mb-[4rem]" />
          </>
        )}
        {data.status === 'canceled' && (
          <>
            <div className="w-full h-[3.5rem] flex items-center justify-center bg-gray-200 rounded-[1.75rem] mt-[1.2rem]">
              <p className="font-semibold text-[1.6rem] leading-[1.909rem] text-gray-600">This challenge has been canceled</p>
            </div>
            <div className="border border-gray-200 w-full mt-[1.2em]" />
          </>
        )}
        <div className="flex justify-between w-full">
          <p className="font-semibold text-[2.4rem] leading-[2.864rem]">{data.title}</p>
          {data.status === 'onGoing' && <Image src={toggle} alt="toggle" />}
        </div>
        <div>
          <ChipCategory mediaType={data.mediaType} />
        </div>
      </div>
      <div className="flex flex-col mt-[2.4rem] gap-[2.4rem] w-full">
        <p className="font-normal text-[1.6rem] leading-[2.08rem] text-gray-700">{data.description}</p>
        <div className="flex w-[30rem] justify-between items-center">
          <div className="flex gap-[0.8rem] items-center">
            <Image src={profile} alt="profile" />
            <p className="font-medium text-[1.2rem] leading-[1.432rem] text-gray-800">{data.requestUser.name}</p>
          </div>
          <div className="flex gap-[0.44rem] items-center">
            <Image src={clock} alt="clock" />
            <p className="font-normal text-[1.3rem] leading-[1.551rem] text-gray-600">Closing on {formatDate(data.deadline)}</p>
          </div>
        </div>
        <div className="flex gap-[2.4rem]">
          {renderImage(data.imageUrl, 'Image 1')}
          {renderImage(data.imageUrl2, 'Image 2')}
        </div>
      </div>
      {isModalOpen && <ImageEnlargeModal src={modalImage} alt={modalAlt} onClose={handleModalClose} />}
    </div>
  );
}

'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import nextImage from '@/../public/assets/btn_photo_swipe.png';
import inactiveHeart from '@/../public/assets/icon_heart_inactive_large.png';
import kebab from '@/../public/assets/icon_kebab_cancel.png';
import member from '@/../public/assets/img_profile_member.png';
import type { WorkDataProps } from '@/interfaces/workInterface';
import CancelDropdown from '../Dropdown/CancelDropdown';
import ConfirmModal from '../Modal/ConfirmModal';
import ImageEnlargeModal from '../Modal/ImageEnlargeModal';

export default function WorkCard({ data, user }: WorkDataProps) {
  if (!data) {
    return <div>로딩 중...</div>;
  }

  const router = useRouter();
  enum ImgOrder {
    first = 0,
    second = 1
  }
  const formattedDate = format(new Date(data.createdAt), 'yy/MM/dd HH:mm');
  const formattedNumber = data.likeCount.toLocaleString();
  const [isOpen, setIsOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<ImgOrder>(ImgOrder.first);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openImg = () => setIsOpen(true);
  const closeImg = () => setIsOpen(false);
  const handleNext = () => {
    setCurrentOrder(prevOrder => (prevOrder === ImgOrder.first ? ImgOrder.second : ImgOrder.first));
  };
  const handledropdownClick = () => setDropdownOpen(prev => !prev);
  const handleCancelClick = () => {
    setDropdownOpen(false);
    setModalOpen(true);
  };
  const handleModalCancel = () => {
    setModalOpen(false);
  };
  const handleDeleteWork = () => {
    // 추후 작업물 페이지 작업 때 작업물 데이터 및 유저 데이터 받아와서 삭제 기능 만들 예정
    router.push('/challengeList');
  };

  return (
    <div className="flex flex-col w-[120rem] gap-[1rem]">
      <div className="border-b border-b-gray-200 pb-[1.5rem] flex justify-between items-center">
        <p className="text-[2.4rem] font-bold text-left text-gray-700">{data.title}</p>
        {user.id === data.ownerId && (
          <div className="relative">
            <Image src={kebab} alt="드롭다운 이미지" onClick={handledropdownClick} className="cursor-pointer" />
            <div className="absolute right-[0] top-[4.4rem]">
              {dropdownOpen && <CancelDropdown onCancel={handleCancelClick}>Cancel</CancelDropdown>}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-[1.5rem] mb-[1rem]">
        <div className="flex items-center gap-[0.5rem]">
          <Image src={member} alt="유저이미지" width={24} height={24} />
          <p className="text-[1.4rem] font-medium text-gray-800">{user.name}</p>
          <p className="text-[1.2rem] font-medium text-gray-500 mr-[0.5rem]">{user.role}</p>
          <Image src={inactiveHeart} alt="비활성 하트" width={24} height={24} />
          <p className="text-[1.4rem] font-medium text-gray-800">{formattedNumber}</p>
        </div>
        <div>
          <p className="text-[1.4rem] font-medium text-gray-400">{formattedDate}</p>
        </div>
      </div>
      <div className="flex">
        <div className="mr-[0.3rem] w-[47.6rem] h-[47.9rem] relative cursor-pointer">
          <Image src={data.images[currentOrder]} alt="작업물 이미지" fill className="object-cover" onClick={openImg} />
        </div>
        <div className="flex items-center">
          <Image src={nextImage} alt="다음 이미지 버튼" onClick={handleNext} className="cursor-pointer" />
        </div>
        <p className="text-[1.6rem] font-normal text-gray-800">{data.content}</p>
      </div>
      {isOpen && <ImageEnlargeModal src={data.images[currentOrder]} alt="작업물 이미지" onClose={closeImg} />}
      {modalOpen && <ConfirmModal onCancel={handleModalCancel} onDelete={handleDeleteWork} />}
    </div>
  );
}

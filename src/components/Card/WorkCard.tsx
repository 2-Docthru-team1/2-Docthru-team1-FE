'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import nextImage from '@/../public/assets/btn_photo_swipe.png';
import activeHeart from '@/../public/assets/icon_heart_active_large.png';
import inactiveHeart from '@/../public/assets/icon_heart_inactive_large.png';
import kebab from '@/../public/assets/icon_kebab_cancel.png';
import member from '@/../public/assets/img_profile_member.png';
import { deleteWorkDetail, likePost, unLikePost } from '@/api/workService';
import type { WorkDataProps } from '@/interfaces/workInterface';
import { Formatter, useFormatter } from '../../../hooks/useFormatter';
import CancelDropdown from '../Dropdown/CancelDropdown';
import ConfirmModal from '../Modal/ConfirmModal';
import ImageEnlargeModal from '../Modal/ImageEnlargeModal';

export default function WorkCard({ data, user }: WorkDataProps) {
  if (!data) return null;
  const router = useRouter();

  enum ImgOrder {
    first = 0,
    second = 1
  }
  const formattedDate = useFormatter(Formatter.Date, data.createdAt);
  const formattedNumber = useFormatter(Formatter.Number, data.likeCount);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<ImgOrder>(ImgOrder.first);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(
    Array.isArray(data.likeUsers)
      ? data.likeUsers.some((likeUser: { id: string }) => likeUser.id === user.id)
      : data.likeUsers.id === user.id
  );

  const openImg = () => setIsImageOpen(true);
  const closeImg = () => setIsImageOpen(false);
  const handleNextImage = () => {
    setCurrentOrder(prevOrder => (prevOrder === ImgOrder.first ? ImgOrder.second : ImgOrder.first));
  };
  const handleDropdownClick = () => setIsDropdownOpen(prev => !prev);
  const handleCancelClick = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };
  const mutation = useMutation({
    mutationFn: async () => await deleteWorkDetail(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work'] });
      router.push('/challengeList');
    },
    onError: () => {
      alert('Failed to delete the work. Please try again.');
    }
  });
  const handleDeleteWork = async () => {
    mutation.mutate();
  };
  const role = data.owner.role === 'normal' ? 'Koo-koo' : data.owner.role;

  const useLikeMutation = (workId: string) => {
    const queryClient = useQueryClient();

    return {
      likeMutate: useMutation({
        mutationFn: async () => await likePost(workId),
        onMutate: async () => {
          const previousWork = queryClient.getQueryData(['work', workId]);
          queryClient.setQueryData(['work', workId], (oldData: any) => ({
            ...oldData,
            likeCount: oldData.likeCount + 1,
            likeUsers: [...oldData.likeUsers, { id: user.id }]
          }));
          return { previousWork };
        },

        onError: (context: any) => {
          queryClient.setQueryData(['work', workId], context.previousWork);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['work', workId] });
        }
      }),

      // 좋아요 취소 Mutation
      unLikeMutate: useMutation({
        mutationFn: () => unLikePost(workId),

        onMutate: async () => {
          const previousWork = queryClient.getQueryData(['work', workId]);

          queryClient.setQueryData(['work', workId], (oldData: any) => ({
            ...oldData,
            likeCount: oldData.likeCount - 1,
            likeUsers: oldData.likeUsers.filter((data: any) => data.id !== user.id)
          }));

          return { previousWork };
        },

        onError: (context: any) => {
          queryClient.setQueryData(['work', workId], context.previousWork);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['work', workId] });
        }
      })
    };
  };

  const { likeMutate, unLikeMutate } = useLikeMutation(data.id);

  const toggleLike = () => {
    if (liked) {
      unLikeMutate.mutate();
    } else {
      likeMutate.mutate();
    }
    setLiked(prevLiked => !prevLiked);
  };

  return (
    <div className="flex flex-col w-[120rem] gap-[1rem] mt-[2rem]">
      <div className="border-b border-b-gray-200 pb-[1.5rem] flex justify-between items-center">
        <p className="text-[2.4rem] font-bold text-left text-gray-700">{data.title}</p>
        {user?.id === data?.owner?.id && (
          <div className="relative">
            <Image
              src={kebab}
              alt="드롭다운 이미지"
              onClick={handleDropdownClick}
              className="cursor-pointer"
              width={24}
              height={24}
              priority
            />
            <div className="absolute right-[0] top-[4.4rem]">
              {isDropdownOpen && <CancelDropdown onCancel={handleCancelClick}>Cancel</CancelDropdown>}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-b border-b-gray-200 pb-[1.5rem] mb-[1rem]">
        <div className="flex items-center gap-[0.5rem]">
          <Image src={member} alt="유저이미지" width={24} height={24} priority />
          <p className="text-[1.4rem] font-medium text-gray-800">{data.owner.name}</p>
          <p className="text-[1.2rem] font-medium text-gray-500 mr-[0.5rem]">{role}</p>
          <Image
            src={liked ? activeHeart : inactiveHeart}
            alt="비활성 하트"
            width={24}
            height={24}
            priority
            onClick={toggleLike}
            className="cursor-pointer"
          />
          <p className="text-[1.4rem] font-medium text-gray-800">{formattedNumber}</p>
        </div>
        <div>
          <p className="text-[1.4rem] font-medium text-gray-400">{formattedDate}</p>
        </div>
      </div>
      <div className="flex border-b border-b-gray-200 pb-[4rem]">
        <div className="mr-[0.3rem] w-[47.6rem] h-[47.9rem] relative cursor-pointer ]">
          <Image
            src={data.images.length === 1 ? data.images[0].imageUrl : data.images[currentOrder].imageUrl}
            alt="작업물 이미지"
            fill
            className="object-cover"
            onClick={openImg}
            priority
          />
        </div>
        {!(data.images.length === 1) ? (
          <div className="flex items-center">
            <Image
              src={nextImage}
              alt="다음 이미지 버튼"
              onClick={handleNextImage}
              className="cursor-pointer"
              width={40}
              height={40}
            />
          </div>
        ) : (
          <div></div>
        )}
        <p className="text-[1.6rem] font-normal text-gray-800">{data.content}</p>{' '}
      </div>
      {isImageOpen && (
        <ImageEnlargeModal
          src={data.images.length === 1 ? data.images[0].imageUrl : data.images[currentOrder].imageUrl}
          alt="작업물 이미지"
          onClose={closeImg}
        />
      )}
      {isModalOpen && <ConfirmModal onCancel={handleModalCancel} onDelete={handleDeleteWork} />}
    </div>
  );
}

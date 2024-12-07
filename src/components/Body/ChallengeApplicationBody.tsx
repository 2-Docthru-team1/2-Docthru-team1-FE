'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import type { ChallengeApplicationBodyProps } from '@/interfaces/bodyInterface';
import ChipStatus from '../Chip/ChipStatus';

enum Status {
  Pending = 'pending',
  Finished = 'finished',
  Denied = 'denied',
  OnGoing = 'onGoing',
  Canceled = 'canceled',
  Aborted = 'aborted'
}

enum MediaType {
  Youtube = 'youtube',
  Blog = 'blog',
  RecipeWeb = 'recipeWeb',
  SocialMedia = 'socialMedia'
}

export default function ChallengeApplicationBody({ type, data }: ChallengeApplicationBodyProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yy/MM/dd');
  };

  const handleListClick = (id: string) => {
    if (type === 'admin') {
      router.push(`/auth/challenge/${id}`);
    } else if (type === 'normal') {
      router.push(`/me/challenge/${id}`);
    }
  };

  return (
    <div className="w-[99.6rem] mb-[1rem]">
      {!data?.length ? (
        <div className="flex items-center justify-center mt-[2rem]">
          <p className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-400">There is no challenge application yet</p>
        </div>
      ) : (
        <>
          <div className="flex rounded-[0.8rem] bg-primary-beige h-[3.6rem]">
            <p className="w-[6.8rem] flex items-center justify-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white">
              No.
            </p>
            <p className="w-[12rem] flex items-center justify-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white">
              Media
            </p>
            <p className="md:w-[32.2rem] sm:w-[21rem] flex items-center justify-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white">
              Challenge Title
            </p>
            <p className="md:w-[18.3rem] sm:w-[10rem] flex items-center justify-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white">
              Request Date
            </p>
            <p className="md:w-[18.3rem] sm:w-[10rem] flex items-center justify-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white">
              Deadline
            </p>
            <p className="w-[12rem] flex items-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white px-[3.6rem]">
              Status
            </p>
          </div>
          <div className="mt-[1.6rem] bg-primary-white">
            {data?.map((item, index) => {
              let statusLabel: 'pend' | 'deny' | 'approve' | 'cancel';
              let mediaLabel: string;

              switch (item.status) {
                case Status.Pending:
                  statusLabel = 'pend';
                  break;
                case Status.Finished:
                  statusLabel = 'approve';
                  break;
                case Status.Denied:
                  statusLabel = 'deny';
                  break;
                case Status.OnGoing:
                  statusLabel = 'approve';
                  break;
                case Status.Canceled:
                  statusLabel = 'cancel';
                  break;
                case Status.Aborted:
                  statusLabel = 'deny';
                  break;
                default:
                  statusLabel = 'pend';
              }

              switch (item.mediaType) {
                case MediaType.Youtube:
                  mediaLabel = 'Youtube';
                  break;
                case MediaType.Blog:
                  mediaLabel = 'Blog';
                  break;
                case MediaType.RecipeWeb:
                  mediaLabel = 'Recipe Web';
                  break;
                case MediaType.SocialMedia:
                  mediaLabel = 'Social Media';
                  break;
                default:
                  mediaLabel = 'Unknown';
              }

              return (
                <div
                  key={index}
                  className="flex items-center justify-between h-[4.8rem] border-b border-gray-300 cursor-pointer"
                  onClick={() => handleListClick(item.id)}
                >
                  <p className="w-[6.8rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500 py-[1.5rem] px-[1.6rem]">
                    {item.number}
                  </p>
                  <p className="w-[12rem] flex items-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500 py-[1.5rem] px-[1.6rem]">
                    {mediaLabel}
                  </p>
                  <div
                    className="md:w-[32.2rem] sm:w-[21rem] flex items-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-700 
                  overflow-hidden text-ellipsis whitespace-nowrap max-h-[3rem] py-[1.5rem] px-[1.6rem]"
                  >
                    <p className="block overflow-hidden text-ellipsis overflow-hidden whitespace-normal">{item.title}</p>
                  </div>
                  <p className="md:w-[18.3rem] sm:w-[10rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500 py-[1.5rem] px-[1.6rem]">
                    {formatDate(item.updatedAt)}
                  </p>
                  <p className="md:w-[18.3rem] sm:w-[10rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500 py-[1.5rem] px-[1.6rem]">
                    {formatDate(item.deadline)}
                  </p>
                  <div className="md:w-[12rem] sm:w-[10rem] flex items-center font-normal py-[1.5rem] px-[1.6rem]">
                    <ChipStatus type={statusLabel} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

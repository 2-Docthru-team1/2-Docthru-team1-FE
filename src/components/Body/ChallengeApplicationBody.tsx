import { format } from 'date-fns';
import type { ChallengeApplicationBodyProps } from '@/interfaces/bodyInterface';
import ChipCard from '../Chip/ChipCard';
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

export default function ChallengeApplicationBody({ data }: ChallengeApplicationBodyProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yy/MM/dd');
  };

  return (
    <div className="w-[99.6rem]">
      <div className="flex rounded-[0.8rem] bg-primary-beige h-[3.6rem]">
        <p className="w-[6.8rem] flex items-center justify-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white">
          No.
        </p>
        <p className="w-[8.4rem] flex items-center justify-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white">
          Media
        </p>
        <p className="w-[35.8rem] flex items-center justify-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white">
          Challenge Title
        </p>
        <p className="w-[18.3rem] flex items-center justify-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white">
          Request Date
        </p>
        <p className="w-[18.3rem] flex items-center justify-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white">
          Deadline
        </p>
        <p className="w-[12rem] flex items-center justify-center font-medium text-[1.3rem] leading-[1.551rem] text-primary-white">
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
              statusLabel = 'cancel';
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
            <div key={index} className="flex items-center justify-between h-[4.8rem] border-b border-gray-300">
              <p className="w-[6.8rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500">
                {item.number}
              </p>
              <p className="w-[8.4rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500">
                {mediaLabel}
              </p>
              <p
                className="w-[35.8rem] flex items-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-700 
                  overflow-hidden text-ellipsis whitespace-nowrap max-h-[3rem]"
              >
                <span className="block overflow-hidden text-ellipsis overflow-hidden whitespace-normal">{item.title}</span>
              </p>
              <p className="w-[18.3rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500">
                {formatDate(item.updatedAt)}
              </p>
              <p className="w-[18.3rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500">
                {formatDate(item.deadline)}
              </p>
              <p className="w-[12rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500">
                <ChipStatus type={statusLabel} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import type { ChallengeApplicationBodyProps } from '@/interfaces/bodyInterface';

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
          let statusLabel;
          let mediaLabel;

          switch (item.status) {
            case Status.Pending:
              statusLabel = 'Pending';
              break;
            case Status.Finished:
              statusLabel = 'Approved';
              break;
            case Status.Denied:
              statusLabel = 'Denied';
              break;
            case Status.OnGoing:
              statusLabel = 'Approved';
              break;
            case Status.Canceled:
              statusLabel = 'Canceled';
              break;
            case Status.Aborted:
              statusLabel = 'Canceled';
              break;
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
          }

          return (
            <div key={index} className="flex items-center justify-between h-[4.8rem] rounded-[0.4rem] border-b border-gray-300">
              <p className="w-[6.8rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500">
                {item.number}
              </p>
              <p className="w-[8.4rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500">
                {mediaLabel}
              </p>
              <p className="w-[35.8rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-700">
                {item.title}
              </p>
              <p className="w-[18.3rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500">
                {item.updatedAt}
              </p>
              <p className="w-[18.3rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500">
                {item.deadline}
              </p>
              <p className="w-[12rem] flex items-center justify-center font-normal text-[1.3rem] leading-[1.551rem] text-gray-500">
                {statusLabel}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

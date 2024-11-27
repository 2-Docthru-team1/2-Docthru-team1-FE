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
  let status;
  let media;

  switch (data.status) {
    case Status.Pending:
      status = 'Pending';
      break;
    case Status.Finished:
      status = 'Approved';
      break;
    case Status.Denied:
      status = 'Denied';
      break;
    case Status.OnGoing:
      status = 'Approved';
      break;
    case Status.Canceled:
      status = 'Canceled';
      break;
    case Status.Aborted:
      status = 'Canceled';
      break;
  }

  switch (data.mediaType) {
    case MediaType.Youtube:
      media = 'Youtube';
      break;
    case MediaType.Blog:
      media = 'Blog';
      break;
    case MediaType.RecipeWeb:
      media = 'Recipe Web';
      break;
    case MediaType.SocialMedia:
      media = 'Social Media';
      break;
  }

  return (
    <div>
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
    </div>
  );
}

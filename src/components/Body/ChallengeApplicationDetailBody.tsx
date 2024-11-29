import type { ChallengeApplicationDetailBody } from '@/interfaces/challengeInterface';

export default function ChallengeApplicationDetailBody({ data }: ChallengeApplicationDetailBody) {
  return (
    <div>
      <div className="flex flex-col gap-[2.4rem]">
        <p className="font-semibold text-[1.8rem] leading-[2.148rem] text-gray-800">Recipe Link / Attached Article</p>
        <iframe src={data.embedUrl} title="Embedded Content" width={890} height={424} />
      </div>
      <div className="border border-gray-200 w-full mt-[2.4rem] mb-[4rem]" />
      <div>
        <button>Decline</button>
        <button>Approve</button>
      </div>
    </div>
  );
}

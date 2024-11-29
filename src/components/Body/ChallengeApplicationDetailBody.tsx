import type { ChallengeApplicationDetailBody } from '@/interfaces/challengeInterface';

export default function ChallengeApplicationDetailBody({ data }: ChallengeApplicationDetailBody) {
  return (
    <div className="w-[120rem]">
      <div className="flex flex-col gap-[2.4rem]">
        <p className="font-semibold text-[1.8rem] leading-[2.148rem] text-gray-800">Recipe Link / Attached Article</p>
        <iframe src={data.embedUrl} title="Embedded Content" width={890} height={424} />
      </div>
      <div className="border border-gray-200 w-full mt-[2.4rem] mb-[4rem]" />
      <div className="flex gap-[1.2rem] h-[4.8rem] justify-end">
        <button className="w-[15.3rem] bg-[#FFE7E7] text-[#F24744] rounded-[1.2rem] font-semibold text-[1.6rem] leading-[2.6rem] flex items-center justify-center">
          Decline
        </button>
        <button className="w-[15.3rem] bg-primary-blue text-primary-white rounded-[1.2rem] font-semibold text-[1.6rem] leading-[2.6rem] flex items-center justify-center">
          Approve
        </button>
      </div>
    </div>
  );
}

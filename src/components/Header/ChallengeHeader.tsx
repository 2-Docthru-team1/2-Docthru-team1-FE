import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import door from '@/../public/assets/icon_red_door.png';
import type { ChallengeHeaderProps } from '@/interfaces/challengeInterface';

export default function ChallengeHeader({ onSubmit }: ChallengeHeaderProps) {
  const { id } = useParams();
  const router = useRouter();

  const handleQuit = () => {
    router.push(`/challengeList/${id}`);
  };

  return (
    <div className="flex flex-col w-[87.1rem] items-center mt-[3.6rem]">
      <div className="flex w-full h-[4rem] justify-between">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">Write your challenge</p>
        <div className="flex gap-[0.8rem]">
          <button
            className="flex items-center bg-[#FFE7E7] rounded-[0.8rem] py-[0.8rem] px-[1.2rem] gap-[0.5rem] w-[9rem] font-semibold text-[1.6rem] leading-[1.909rem] text-[#F24744] justify-center"
            onClick={handleQuit}
          >
            Quit
            <Image src={door} alt="문" />
          </button>
          <button className="w-[9rem] rounded-[0.8rem] border border-gray-700 py-[0.3rem] px-[1.6rem] font-semibold text-[1.6rem] leading-[1.909rem]">
            Save
          </button>
          <button
            onClick={onSubmit}
            className="w-[9rem] rounded-[0.8rem] bg-primary-blue py-[0.3rem] px-[1.6rem] font-semibold text-[1.6rem] text-[#ffffff] leading-[1.909rem]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

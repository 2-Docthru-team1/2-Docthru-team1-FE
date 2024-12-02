import Image from 'next/image';
import door from '@/../public/assets/icon_red_door.png';

export default function ChallengeHeader() {
  return (
    <div className="flex flex-col items-center mt-[3.6rem] lg:w-[87.1rem] lg:px-0 md:w-full md:pl-[8rem] md:max-w-[87.1rem] sm:w-full sm:min-w-[34.3rem] sm:pl-[5rem] ">
      <div className="flex w-full h-[4rem] justify-between items-center gap-0 pr-0 sm:gap-[1rem]">
        <p className="font-semibold lg:text-[2rem] md:text-[2rem] sm:text-[1.6rem] leading-[2.387rem] text-gray-700 whitespace-nowrap">
          Write your challenge
        </p>
        <div className="flex lg:gap-[0.8rem] md:gap-[0.8rem] sm:gap-[0.3rem]">
          <button className="flex items-center bg-[#FFE7E7] rounded-[0.8rem] py-[0.8rem] px-[1.2rem] gap-[0.5rem] w-[9rem] sm:w-full sm:min-w-[4rem] font-semibold text-[1.6rem] leading-[1.909rem] text-[#F24744] justify-center">
            <span className="hidden md:inline">Quit</span>
            <Image src={door} alt="문" width={24} height={24} />
          </button>
          <button className="w-[9rem] sm:w-full rounded-[0.8rem] border border-gray-700 py-[0.3rem] px-[1.6rem] font-semibold text-[1.6rem] leading-[1.909rem]">
            Save
          </button>
          <button className="w-[9rem] sm:w-full rounded-[0.8rem] bg-primary-blue py-[0.3rem] px-[1.6rem] font-semibold text-[1.6rem] text-[#ffffff] leading-[1.909rem]">
            Submit
          </button>
        </div>
      </div>
      <input
        placeholder="Title goes here"
        className="mt-[2.4rem] w-full placeholder:gray-400 placeholder:font-semibold font-bold text-[2rem] placeholder:leading-[2.387rem] text-gray-700 focus:outline-none leading-[2.6rem] bg-gray-50"
      />
      <div className="border border-gray-200 w-full mt-[2.4rem] sm:mt-[1.6rem]" />
    </div>
  );
}

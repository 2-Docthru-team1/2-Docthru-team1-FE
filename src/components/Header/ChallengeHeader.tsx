import Image from 'next/image';
import door from '@/../public/assets/icon_red_door.png';

export default function ChallengeHeader() {
  return (
    <div className="flex flex-col w-[118.9rem] items-center mt-[3.6rem]">
      <div className="flex w-full h-[4rem] justify-between">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">Write your challenge</p>
        <div className="flex gap-[0.8rem]">
          <button className="flex items-center bg-[#FFE7E7] rounded-[0.8rem] py-[0.8rem] px-[1.2rem] gap-[0.5rem] w-[9rem] font-semibold text-[1.6rem] leading-[1.909rem] text-[#F24744] justify-center">
            Quite
            <Image src={door} alt="문" />
          </button>
          <button className="w-[9rem] rounded-[0.8rem] border border-gray-700 py-[0.3rem] px-[1.6rem] font-semibold text-[1.6rem] leading-[1.909rem]">
            Save
          </button>
          <button className="w-[9rem] rounded-[0.8rem] bg-primary-blue py-[0.3rem] px-[1.6rem] font-semibold text-[1.6rem] text-[#ffffff] leading-[1.909rem]">
            Submit
          </button>
        </div>
      </div>
      <input
        placeholder="Title goes here"
        className="mt-[2.4rem] w-full placeholder:gray-400 placeholder:font-semibold font-bold text-[2rem] placeholder:leading-[2.387rem] text-gray-700 focus:outline-none leading-[2.6rem]"
      />
      <div className="border border-gray-200 w-full mt-[2.4rem]" />
    </div>
  );
}

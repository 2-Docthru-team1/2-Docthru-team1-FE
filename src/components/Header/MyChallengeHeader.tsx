import Image from 'next/image';
import plus from '@/../public/assets/icon_plus_medium.png';
import search from '@/../public/assets/icon_search.png';

export default function MyChallengeHeader() {
  return (
    <div className="pt-[2.4rem] w-[120rem] flex flex-col">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">My Challenge</p>
        <button className="w-[21rem] h-[3.7rem] bg-primary-beige rounded-[1.95rem] flex items-center justify-center gap-[0.8rem] font-semibold text-[1.6rem] leading-[1.909rem] text-primary-white">
          Request a Challenge
          <Image src={plus} alt="plus" />
        </button>
      </div>
      <div className="w-full h-[5.3rem] flex border-b border-gray-400">
        <div className="w-[16.2rem] flex flex-col gap-[1rem] items-center">
          <p className="font-semibold text-[1.8rem] leading-[2.148rem] text-gray-700">Participating in</p>
          <div className="border-[3px] border-gray-700 w-full" />
        </div>
        <div className="w-[11.9rem] flex flex-col gap-[1rem] items-center">
          <p className="font-semibold text-[1.8rem] leading-[2.148rem] text-gray-700">Finished</p>
          <div className="border-[3px] border-gray-700 w-full" />
        </div>
        <div className="w-[11.2rem] flex flex-col gap-[1rem] items-center">
          <p className="font-semibold text-[1.8rem] leading-[2.148rem] text-gray-700">Applied</p>
          <div className="border-[3px] border-gray-700 w-full" />
        </div>
      </div>
      <div>
        <Image src={search} alt="search" />
        <input placeholder="Search Challenge" />
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import ChallengeBody from '../Body/ChallengeBody';
import ChallengeRefPageCard from '../Card/ChallengeRefPageCard';
import ChallengeHeader from '../Header/ChallengeHeader';

export default function ChallengeTryClient() {
  const [isCardClicked, setIsCardClicked] = useState(false);

  const handleCardClick = () => {
    setIsCardClicked(prev => !prev);
  };

  return (
    <div
      className={`flex justify-center w-full lg:flex-row lg:items-start md:flex-row md:items-start ${!isCardClicked ? 'sm:flex-row sm:items-start' : 'sm:flex-col sm:items-center'}`}
    >
      <div className="flex-1 flex-col items-center justify-center flex mr-[3.8rem] lg:w-[120rem] md:w-full sm:w-full lg:order-1 md:order-1 sm:order-2">
        <div className="w-full flex justify-center">
          <ChallengeHeader />
        </div>
        <div className="mt-[2.4rem] mb-[5rem] w-full flex justify-center lg:pl-0 md:pl-[8rem] sm:pl-[3rem]">
          <ChallengeBody />
        </div>
      </div>
      <div onClick={handleCardClick} className={`${!isCardClicked ? 'sm:order-2' : 'sm:order-1'} lg:order-2 md:order-2`}>
        <ChallengeRefPageCard embedUrl="https://www.example.com" />
      </div>
    </div>
  );
}

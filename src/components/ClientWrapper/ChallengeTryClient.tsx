import ChallengeBody from '../Body/ChallengeBody';
import ChallengeRefPageCard from '../Card/ChallengeRefPageCard';
import ChallengeHeader from '../Header/ChallengeHeader';

export default function ChallengeTryClient() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex-1 flex-col items-center justify-center flex mr-[3.8rem] lg:w-[120rem] md:w-full sm:w-full ">
        <div className="w-full flex justify-center">
          <ChallengeHeader />
        </div>
        <div className="mt-[2.4rem] mb-[5rem] w-full flex justify-center">
          <ChallengeBody />
        </div>
      </div>
      <div>
        <ChallengeRefPageCard embedUrl="https://www.example.com" />
      </div>
    </div>
  );
}

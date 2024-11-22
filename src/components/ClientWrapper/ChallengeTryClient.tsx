import ChallengeBody from '../Body/ChallengeBody';
import ChallengeRefPageCard from '../Card/ChallengeRefPageCard';
import ChallengeHeader from '../Header/ChallengeHeader';

export default function ChallengeTryClient() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex-1 flex-col w-[120rem] items-center flex mr-[3.8rem]">
        <div>
          <ChallengeHeader />
        </div>
        <div className="mt-[2.4rem]">
          <ChallengeBody />
        </div>
      </div>
      <div>
        <ChallengeRefPageCard embedUrl="https://www.example.com" />
      </div>
    </div>
  );
}

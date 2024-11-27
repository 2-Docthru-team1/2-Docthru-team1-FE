import Image from 'next/image';
import plus from '@/../public/assets/icon_plus_medium.png';
import search from '@/../public/assets/icon_search.png';

export default function MyChallengeHeader() {
  return (
    <div>
      <div>
        <p>My Challenge</p>
        <button>
          Request a Challenge
          <Image src={plus} alt="plus" />
        </button>
      </div>
      <div>
        <p>Participating in</p>
        <p>Finished</p>
        <p>Applied</p>
      </div>
      <div>
        <Image src={search} alt="search" />
        <input placeholder="Search Challenge" />
      </div>
    </div>
  );
}

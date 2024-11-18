import Image from 'next/image';
import Link from 'next/link';
import clock from '@/../public/assets/icon_deadline_clock_large.png';
import type { OptionBoxProps } from '@/interfaces/optionboxInterface';

// TODO: 추후 button Link는 수정 예정입니다.

export default function OptionBox({ type }: OptionBoxProps) {
  const participateButtonText = type === 'ongoing' ? 'Keep Participating' : 'Participate Challenge';

  return (
    <div>
      <div>
        <Image src={clock} alt="시계" />
        <p>Closing on 2024-03-03</p>
      </div>
      <div>
        <Link href="/">
          <button>See Content</button>
        </Link>
        <Link href="/">
          <button>{participateButtonText}</button>
        </Link>
      </div>
    </div>
  );
}

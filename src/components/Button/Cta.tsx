import Link from 'next/link';
import type { CtaProps } from '@/interfaces/buttonInterface';

const Cta = ({ children, url }: CtaProps) => {
  return (
    <Link href={url}>
      <button className="text-[2rem] bg-primary-blue font-semibold rounded-[0.8rem] pt-[1.5rem] pb-[1.5rem] pl-[2.8rem] pr-[2.8rem] text-[#ffffff]">
        {children}
      </button>
    </Link>
  );
};

export default Cta;

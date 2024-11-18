import Link from 'next/link';
import type { CtaProps } from '@/interfaces/buttonInterface';

const Cta = ({ children, url }: CtaProps) => {
  return (
    <Link href={url}>
      <button className="text-[2rem] bg-primary-blue font-semibold rounded-[0.8rem] py-[1.5rem] px-[2.8rem] text-[#ffffff] leading-[1.909rem]">
        {children}
      </button>
    </Link>
  );
};

export default Cta;

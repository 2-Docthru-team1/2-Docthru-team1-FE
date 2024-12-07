import Link from 'next/link';
import type { CtaProps } from '@/interfaces/buttonInterface';

const Cta = ({ children, url }: CtaProps) => {
  return (
    <Link href={url}>
      <button className="md:text-[1.6rem] sm:text-[1.3rem] bg-primary-blue font-semibold rounded-[0.8rem] md:py-[1.45rem] md:px-[2.8rem] sm:py-[1.05rem] sm:px-[2rem] text-primary-white md:leading-[1.909rem] sm:leading-[1.551rem]">
        {children}
      </button>
    </Link>
  );
};

export default Cta;

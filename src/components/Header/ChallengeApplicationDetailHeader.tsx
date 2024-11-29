'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import toggle from '@/../public/assets/icon_kebab_toggle.png';
import type { ChallengeApplicationDetailHeader } from '@/interfaces/challengeInterface';
import ChipCategory from '../Chip/ChipCategory';
import Pagination from '../Pagination/Pagination';

export default function ChallengeApplicationDetailHeader({ data, totalCount }: ChallengeApplicationDetailHeader) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-[120rem] items-center justify-center flex flex-col">
      <div className="flex justify-between w-full items-center">
        <p className="font-normal text-[1.6rem]">No. {data.number}</p>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasNext={currentPage < totalPages}
          type="admin"
        />
      </div>
      <div className="flex flex-col w-full gap-[1.6rem]">
        <div className="flex justify-between w-full">
          <p className="font-semibold text-[2.4rem] leading-[2.864rem]">{data.title}</p>
          <Image src={toggle} alt="toggle" />
        </div>
        <div>
          <ChipCategory mediaType={data.mediaType} />
        </div>
      </div>
    </div>
  );
}

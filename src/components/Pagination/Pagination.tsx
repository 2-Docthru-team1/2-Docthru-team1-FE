import Image from 'next/image';
import arrowActLeft from '@/../public/assets/icon_arrow_act_left_large.png';
import arrowActRight from '@/../public/assets/icon_arrow_act_right_large.png';
import arrowInActLeft from '@/../public/assets/icon_arrow_inact_left_large.png';
import arrowInActRight from '@/../public/assets/icon_arrow_inact_right_large.png';
import type { PaginationProps } from '@/interfaces/paginationInterface';

export default function Pagination({ currentPage, totalPages, onPageChange, hasNext = false }: PaginationProps) {
  const maxPageNumbers = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  if (endPage - startPage < maxPageNumbers - 1) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  return (
    <div className="flex gap-[1.2rem]">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <Image src={currentPage === 1 ? arrowInActLeft : arrowActLeft} alt="화살표" />
      </button>
      <div className="flex gap-[0.6rem]">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            className={`w-[4rem] h-[4rem] rounded-[0.8rem] font-medium text-[1.4rem] leading-[1.671rem] ${startPage + index === currentPage ? 'text-[#ffffff] bg-primary-blue' : 'text-gray-400'}`}
            key={startPage + index}
            onClick={() => onPageChange(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}
      </div>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={!hasNext || currentPage === totalPages}>
        <Image src={!hasNext || currentPage === totalPages ? arrowInActRight : arrowActRight} alt="화살표" />
      </button>
    </div>
  );
}

import Image from 'next/image';
import arrowActLeft from '@/../public/assets/icon_arrow_act_left_large.png';
import arrowActRight from '@/../public/assets/icon_arrow_act_right_large.png';
import arrowInActLeft from '@/../public/assets/icon_arrow_inact_left_large.png';
import arrowInActRight from '@/../public/assets/icon_arrow_inact_right_large.png';
import type { PaginationProps } from '@/interfaces/paginationInterface';

export default function Pagination({ currentPage, totalPages, onPageChange, hasNext = false, type }: PaginationProps) {
  const maxPageNumbers = 5;
  const pageNumbers = [];
  const currentGroup = Math.ceil(currentPage / maxPageNumbers);
  const startPage = (currentGroup - 1) * maxPageNumbers + 1;
  const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrevGroupClick = () => {
    const newStartPage = startPage - maxPageNumbers;
    if (newStartPage > 0) {
      onPageChange(newStartPage + maxPageNumbers - 1);
    }
  };

  const handleNextGroupClick = () => {
    const newStartPage = startPage + maxPageNumbers;
    if (newStartPage <= totalPages) {
      onPageChange(newStartPage);
    }
  };

  return (
    <div className="flex gap-[1.2rem] justify-center items-center">
      {type === 'default' ? (
        <div className="flex justify-center items-center gap-[0.8rem]">
          {startPage > 1 && (
            <button onClick={handlePrevGroupClick}>
              <Image src={currentPage === 1 ? arrowInActLeft : arrowActLeft} alt="화살표" />
            </button>
          )}

          {pageNumbers.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-[4rem] h-[4rem] rounded-[0.8rem] font-medium text-[1.4rem] leading-[1.671rem] ${currentPage === page ? 'text-[#ffffff] bg-primary-blue' : 'text-gray-400'}`}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <button onClick={handleNextGroupClick}>
              <Image src={!hasNext || currentPage === totalPages ? arrowInActRight : arrowActRight} alt="화살표" />
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center w-[9.7rem] justify-between">
          <div className="flex items-center">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
              <Image src={currentPage === 1 ? arrowInActLeft : arrowActLeft} alt="화살표" />
            </button>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={!hasNext || currentPage === totalPages}>
              <Image src={!hasNext || currentPage === totalPages ? arrowInActRight : arrowActRight} alt="화살표" />
            </button>
          </div>
          <div className="flex gap-[0.4rem] items-center">
            <p className="text-[1.3rem] leading-[1.551rem] text-medium text-primary-blue">{currentPage}</p>
            <p className="text-[1.3rem] leading-[1.551rem] text-medium text-gray-800">/</p>
            <p className="text-[1.3rem] leading-[1.551rem] text-medium text-gray-800">{totalPages}</p>
          </div>
        </div>
      )}
    </div>
  );
}

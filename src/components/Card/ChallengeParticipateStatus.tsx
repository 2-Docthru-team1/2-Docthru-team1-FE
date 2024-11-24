import Image from 'next/image';
import { useState } from 'react';
import crown from '@/../public/assets/icon_crown_small.png';
import type { ChallengeParticipateStatusProps } from '@/interfaces/cardInterface';
import Pagination from '../Pagination/Pagination';
import ChallengeParticipantCard from './ChallengeParticipantCard';

export default function ChallengeParticipateStatus({ data }: ChallengeParticipateStatusProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(data.totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatRank = (rank: number) => {
    if (isNaN(rank)) return '--';
    return rank < 10 ? `0${rank}` : `${rank}`;
  };

  return (
    <div className="w-[120.4rem] rounded-[0.8rem] border border-gray-200 gap-[2rem] py-[1.9rem] px-[1.6rem] bg-primary-white">
      <div className="flex items-center justify-between gap-[2rem]">
        <p className="font-semibold	text-[1.6rem] leading-[1.909rem] text-gray-800">Participant Status</p>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasNext={currentPage < totalPages}
          type="small"
        />
      </div>
      <div className="flex gap-[2rem]">
        {currentItems.map((participant, index) => {
          const rank = index + 1 + (currentPage - 1) * itemsPerPage;
          if (isNaN(rank)) {
            console.error('Rank is NaN:', { index, currentPage, itemsPerPage });
          }
          return (
            <div key={participant.id} className="flex flex-col gap-[2rem]">
              <div className="inline-flex items-center gap-[2rem]">
                {rank === 1 ? (
                  <div className="flex justify-center flex-col mt-[2rem] w-[27.8rem]">
                    <div className="bg-gray-700 rounded-[1.6rem] py-[0.2rem] px-[0.7rem] flex items-center justify-center w-[5.1rem]">
                      <Image src={crown} alt="Crown" />
                      <p className="font-medium text-[1.4rem] leading-[1.671rem] text-primary-beige flex items-center">
                        {String(formatRank(rank))}
                      </p>
                    </div>
                    <div className="flex mt-[2rem]">
                      <ChallengeParticipantCard initialData={participant} type="first" />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center flex-col mt-[2rem]">
                    <div className="bg-gray-700 rounded-[1.6rem] py-[0.2rem] px-[0.7rem] flex items-center justify-center w-[5.1rem]">
                      <p className="w-[3.7rem] flex justify-center font-medium text-[1.4rem] leading-[1.671rem] text-[#F1F2F5] flex items-center">
                        {formatRank(rank)}
                      </p>
                    </div>
                    <div className="flex mt-[2rem]">
                      <ChallengeParticipantCard initialData={participant} type="etc" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

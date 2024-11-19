import Image from 'next/image';
import { useState } from 'react';
import crown from '@/../public/assets/icon_crown_small.png';
import type { ChallengeParticipateStatusProps } from '@/interfaces/cardInterface';
import Pagination from '../Pagination/Pagination';
import ChallengeParticipantCard from './ChallengeParticipantCard';

export default function ChallengeParticipateStatus({ data }: ChallengeParticipateStatusProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatRank = (rank: number) => {
    return rank < 10 ? `0${rank}` : `${rank}`;
  };

  return (
    <div className="w-[102.4rem] rounded-[0.8rem] border border-gray-200 gap-[2rem] py-[1.9rem] px-[1.6rem]">
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
          return (
            <div key={participant.id} className="flex flex-col">
              <div className="bg-gray-700 inline-flex items-center py-[0.2rem] px-[0.7rem] rounded-[1.6rem] inline-box gap-[0.2rem]">
                {rank === 1 ? (
                  <div className="flex flex-shrink-0 w-[3.7rem] justify-cneter">
                    <div className="flex">
                      <Image src={crown} alt="Crown" />
                      <p className="font-medium text-[1.4rem] leading-[1.671rem] text-primary-beige flex items-center">
                        {formatRank(rank)}
                      </p>
                    </div>
                    <div>
                      <ChallengeParticipantCard initialData={participant} type="first" />
                    </div>
                  </div>
                ) : (
                  <p className="w-[3.7rem] flex justify-center font-medium text-[1.4rem] leading-[1.671rem] text-[#F1F2F5] flex items-center">
                    {formatRank(rank)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

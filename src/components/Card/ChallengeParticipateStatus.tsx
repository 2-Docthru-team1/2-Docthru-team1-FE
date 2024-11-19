import Image from 'next/image';
import { useState } from 'react';
import crown from '@/../public/assets/icon_crown_small.png';
import type { ChallengeParticipateStatusProps } from '@/interfaces/cardInterface';
import Pagination from '../Pagination/Pagination';

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

  return (
    <div>
      <h2>Participant Status</h2>
      <ul>
        {currentItems.map((participant, index) => {
          const rank = index + 1 + (currentPage - 1) * itemsPerPage;
          return (
            <div key={participant.id}>
              {rank === 1 ? (
                <>
                  <Image src={crown} alt="Crown" /> <p>{rank}위</p>
                </>
              ) : (
                <p>{rank}위</p>
              )}
              {participant.nickname}: {participant.role}
            </div>
          );
        })}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        hasNext={currentPage < totalPages}
        type="small"
      />
    </div>
  );
}

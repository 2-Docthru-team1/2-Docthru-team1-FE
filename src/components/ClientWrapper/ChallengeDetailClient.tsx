'use client';

import { useParams } from 'next/navigation';

export default function ChallengeDetailClient() {
  const { id } = useParams();

  return (
    <div>
      <h1>Challenge Details</h1>
      <h1>{id}</h1>
    </div>
  );
}

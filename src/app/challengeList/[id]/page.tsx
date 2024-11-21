// pages/challenges/[id].tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ChallengeDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // 동적 파라미터 'id'를 가져옴

  // id 값 확인을 위해 콘솔 로그를 추가
  console.log('Challenge ID: ', id);

  if (!id) {
    // id가 없으면 로딩 상태를 보여줄 수도 있음
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (id) {
      // id 값이 있을 때 데이터 요청 등을 진행
      console.log('ID 값이 정상적으로 전달되었습니다.', id);
    }
  }, [id]); // id가 변경될 때마다 실행

  return (
    <div>
      <h1>Challenge Details for ID: {id}</h1>
      {/* 여기서 Challenge ID에 맞는 데이터를 불러오는 로직을 작성 */}
    </div>
  );
};

export default ChallengeDetailPage;

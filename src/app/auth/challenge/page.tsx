'use client';

import { useRouter } from 'next/navigation';
import FilterBar from '@/components/FilterBar/FilterBar';
import useStore from '@/store/store';

export default function challengeMgmt() {
  const router = useRouter();

  const { keyword, category, setKeyword, setCategory } = useStore();

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (category) params.set('category', category);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="pt-[2.4rem] flex flex-col w-full items-center">
      <div className="w-[99.6rem]">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">Manage Challenge Application</p>
        <div className="mt-[2.4rem]">
          <FilterBar
            type="admin"
            onKeywordChange={setKeyword}
            onCategoryChange={setCategory}
            onFilterApply={handleFilterChange}
          />
        </div>
        <div className="mt-[4rem]">{/* 표 컴포넌트 자리 */}</div>
      </div>
    </div>
  );
}

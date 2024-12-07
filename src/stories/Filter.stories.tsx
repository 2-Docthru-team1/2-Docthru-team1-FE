import { useRouter } from 'next/navigation';
import React from 'react';
import FilterBar from '@/components/FilterBar/FilterBar';
import useStore from '@/store/store';

export default {
  title: 'Components/FilterBar',
  component: FilterBar
};

const { keyword, setKeyword, category, setCategory } = useStore();

const router = useRouter();

const handleFilterChange = () => {
  const params = new URLSearchParams();
  if (keyword) params.set('keyword', keyword);
  if (category) params.set('category', category);

  router.push(`?${params.toString()}`);
};

export const Challenge = () => <FilterBar type="challenge" onKeywordChange={setKeyword} onFilterApply={handleFilterChange} />;

export const Admin = () => <FilterBar type="admin" onKeywordChange={setKeyword} onFilterApply={handleFilterChange} />;

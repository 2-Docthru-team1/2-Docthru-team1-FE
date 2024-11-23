import React from 'react';
import FilterBar from '@/components/FilterBar/FilterBar';

export default {
  title: 'Components/FilterBar',
  component: FilterBar
};

export const Recipe = () => <FilterBar type="recipe" />;
export const Challenge = () => <FilterBar type="challenge" />;
export const Admin = () => <FilterBar type="admin" />;

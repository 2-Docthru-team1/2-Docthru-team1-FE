import React from 'react';
import FilterBar from '@/components/FilterBar/FilterBar';

export default {
  title: 'Components/FilterBar',
  component: FilterBar
};

const Template = () => <FilterBar type="recipe" />;

export const Default = Template.bind({});
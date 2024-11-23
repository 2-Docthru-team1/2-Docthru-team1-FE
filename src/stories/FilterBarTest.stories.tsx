import type { StoryFn } from '@storybook/react';
import SortBar from '@/components/FilterBar/FilterBarTest';

export default {
  title: 'Components/SortBar',
  component: SortBar
};

const Template: StoryFn = () => <SortBar />;

export const Default = Template.bind({});
Default.args = {};

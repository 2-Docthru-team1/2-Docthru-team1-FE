import type { Meta, StoryFn } from '@storybook/react';
import { title } from 'process';
import React from 'react';
import WorkCard from '@/components/Card/WorkCard';
import type { WorkDataProps } from '@/interfaces/workInterface';

const data = {
  id: '1',
  title: 'My first Bibimbap!',
  createdAt: '2024-11-19T04:44:08.912Z',
  likeCount: 1934,
  images: [{ imageUrl: '/temporaryAssets/food.svg' }],
  content: 'I did it for like one hour!! Look at thissss! I finally made it!',
  owner: { id: 'u123', name: 'Named', role: 'koo-koo' }
};

const user = {
  id: 'u123',
  role: 'normal' as 'normal'
};

export default {
  title: 'Components/WorkCard',
  component: WorkCard,
  args: {
    data,
    user
  },
  parameters: {
    layout: 'centered'
  }
};

const Template: StoryFn<WorkDataProps> = args => <WorkCard {...args} />;
export const Default = Template.bind({});
Default.args = {
  data,
  user
};

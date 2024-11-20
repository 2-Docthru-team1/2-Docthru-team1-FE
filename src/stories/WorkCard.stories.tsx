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
  images: ['/temporaryAssets/food.svg'],
  content: 'I did it for like one hour!! Look at thissss! I finally made it!',
  ownerId: 'u123'
};

const user = {
  id: 'u123',
  name: 'Named',
  role: 'Koo-koo'
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

export const Loading = Template.bind({});
Loading.args = {
  data: null,
  user: {
    id: 'u123',
    name: 'Loading User',
    role: 'Loading Role'
  }
};
import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ChallengeParticipantCard from '@/components/Card/ChallengeParticipantCard';
import type { ChallengeParticipantStatusData, ChallengeParticipantStatusProps } from '@/interfaces/cardInterface';

export default {
  title: 'Components/ChallengeParticipantCard',
  component: ChallengeParticipantCard
} as Meta;

const mockData: ChallengeParticipantStatusData[] = [
  {
    title: 'Challenge 1',
    Feedback: ['Great challenge!', 'Very engaging!'],
    likeCount: 15,
    nickname: 'BoB',
    images: ['/temporaryAssets/food.svg'],
    role: 'normal'
  },
  {
    title: 'Challenge 2',
    Feedback: ['Could be better.', 'Loved the experience!'],
    likeCount: 145,
    nickname: 'BobbbbbbbbbB',
    images: ['/temporaryAssets/food.svg'],
    role: 'admin'
  }
];

const Template: StoryFn<ChallengeParticipantStatusProps> = (args: ChallengeParticipantStatusProps) => (
  <ChallengeParticipantCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  initialData: mockData,
  type: 'first'
};

export const Etc = Template.bind({});
Etc.args = {
  initialData: mockData,
  type: 'etc'
};

export const Loading = Template.bind({});
Loading.args = {
  initialData: []
};

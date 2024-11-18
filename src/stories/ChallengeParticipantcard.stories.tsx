import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ChallengeParticipantCard from '@/components/Card/ChallengeParticipantCard';
import type { ChallengeParticipantStatusData, ChallengeParticipantStatusProps } from '@/interfaces/cardInterface';

export default {
  title: 'Components/ChallengeParticipantCard',
  component: ChallengeParticipantCard
} as Meta;

// Mock data for the story
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

// Create a properly typed story template
const Template: StoryFn<ChallengeParticipantStatusProps> = (args: ChallengeParticipantStatusProps) => (
  <ChallengeParticipantCard {...args} />
);

// Default story
export const Default = Template.bind({});
Default.args = {
  initialData: mockData
};

// Loading state story
export const Loading = Template.bind({});
Loading.args = {
  initialData: []
};

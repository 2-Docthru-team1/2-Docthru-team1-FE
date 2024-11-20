import type { StoryFn } from '@storybook/react';
import ChallengeCard from '@/components/Card/ChallengeCard';
import type { ChallengeCardProps } from '@/interfaces/cardInterface';

export default {
  title: 'Components/ChallengeCard',
  component: ChallengeCard
};

const Template: StoryFn<ChallengeCardProps> = args => <ChallengeCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: '1',
    title: 'Traditional Challenge 1',
    mediaType: 'Blog',
    status: 'ongoing',
    deadline: '2024-12-31T23:59:59.000Z',
    requestUserId: 'user1'
  },
  userId: 'user1',
  role: 'normal'
};

export const ClosedChallenge = Template.bind({});
ClosedChallenge.args = {
  data: {
    id: '2',
    title: 'Banchan Challenge 1',
    mediaType: 'Social Media',
    status: 'finished',
    deadline: '2024-11-30T23:59:59.000Z',
    requestUserId: 'user2'
  },
  userId: 'user3',
  role: 'normal'
};

export const TestChallenge = Template.bind({});
TestChallenge.args = {
  data: {
    id: '3',
    title: 'Noodle Challenge 1',
    mediaType: 'Recipe Web',
    status: 'ongoing',
    deadline: '2024-11-01T23:59:59.000Z',
    requestUserId: 'user3'
  },
  userId: 'user999',
  role: 'admin'
};

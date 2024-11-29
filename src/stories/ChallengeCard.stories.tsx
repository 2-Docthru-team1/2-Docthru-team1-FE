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
    mediaType: 'blog',
    status: 'onGoing',
    deadline: '2024-12-31T23:59:59.000Z',
    requestUser: {
      id: 'user1',
      name: 'John Doe'
    },
    totalLikes: 0,
    createdAt: '2024-11-25T01:23:10.409Z',
    updatedAt: '2024-11-25T01:23:10.409Z'
  },
  userId: 'user1',
  role: 'normal'
};

export const ClosedChallenge = Template.bind({});
ClosedChallenge.args = {
  data: {
    id: '2',
    title: 'Banchan Challenge 1',
    mediaType: 'socialMedia',
    status: 'finished',
    deadline: '2024-11-30T23:59:59.000Z',
    requestUser: {
      id: 'user2',
      name: 'Jane Smith'
    },
    totalLikes: 0,
    createdAt: '2024-11-25T01:23:10.409Z',
    updatedAt: '2024-11-25T01:23:10.409Z'
  },
  userId: 'user3',
  role: 'normal'
};

export const TestChallenge = Template.bind({});
TestChallenge.args = {
  data: {
    id: '3',
    title: 'Noodle Challenge 1',
    mediaType: 'recipeWeb',
    status: 'onGoing',
    deadline: '2024-11-01T23:59:59.000Z',
    requestUser: {
      id: 'user3',
      name: 'Chris Johnson'
    },
    totalLikes: 0,
    createdAt: '2024-11-25T01:23:10.409Z',
    updatedAt: '2024-11-25T01:23:10.409Z'
  },
  userId: 'user999',
  role: 'admin'
};

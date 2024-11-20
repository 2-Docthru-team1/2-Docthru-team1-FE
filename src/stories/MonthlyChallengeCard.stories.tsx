import type { StoryFn } from '@storybook/react';
import MonthlyChallengeCard from '@/components/Card/MonthlyChallengeCard';
import type { MonthlyChallengeCardProps } from '@/interfaces/cardInterface';

export default {
  title: 'Components/MonthlyChallengeCard',
  component: MonthlyChallengeCard
};

const Template: StoryFn<MonthlyChallengeCardProps> = args => <MonthlyChallengeCard {...args} />;

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
  user: {
    id: 'user1',
    name: 'a',
    role: 'Koo-koo'
  }
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
  user: {
    id: 'user2',
    name: 'b',
    role: 'Koo-koo'
  }
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
  user: {
    id: 'user3',
    name: 'c',
    role: 'Koo-koo'
  }
};

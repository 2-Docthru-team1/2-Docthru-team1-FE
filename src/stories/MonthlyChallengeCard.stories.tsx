import type { StoryFn } from '@storybook/react';
import MonthlyChallengeCard from '@/components/Card/MonthlyChallengeCard';
import type { MonthlyChallengeCardProps } from '@/interfaces/cardInterface';

const Template: StoryFn<MonthlyChallengeCardProps> = args => <MonthlyChallengeCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: '1',
    title: 'Recipe Challenge 1',
    cuisineType: 'Traditional',
    mediaType: 'Blog',
    status: 'ongoing',
    closingDate: '2024-12-31T23:59:59.000Z'
  }
};

export const ClosedChallenge = Template.bind({});
ClosedChallenge.args = {
  data: {
    id: '2',
    title: 'Social Media Challenge 1',
    cuisineType: 'BanChan',
    mediaType: 'Social Media',
    status: 'closed',
    closingDate: '2024-11-30T23:59:59.000Z'
  }
};

export const ExpiredChallenge = Template.bind({});
ExpiredChallenge.args = {
  data: {
    id: '3',
    title: 'Expired Challenge',
    cuisineType: 'Noodle',
    mediaType: 'Recipe Web',
    status: 'ongoing',
    closingDate: '2024-11-01T23:59:59.000Z'
  }
};

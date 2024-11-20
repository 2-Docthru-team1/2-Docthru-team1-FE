import type { StoryFn } from '@storybook/react';
import MonthlyRankerCard from '@/components/Card/MonthlyRankerCard';
import type { MonthlyRankerCardProps } from '@/interfaces/cardInterface';

export default {
  title: 'Components/MonthlyRankerCard',
  component: MonthlyRankerCard
};

const Template: StoryFn<MonthlyRankerCardProps> = args => <MonthlyRankerCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      id: '1',
      name: 'User1',
      profileImage: '/path/to/profile1.png',
      totalLikes: 3288,
      role: 'Koo-koo'
    },
    {
      id: '2',
      name: 'User2',
      profileImage: '/path/to/profile2.png',
      totalLikes: 2145,
      role: 'Koo-koo'
    },
    {
      id: '3',
      name: 'User3',
      profileImage: '/path/to/profile3.png',
      totalLikes: 1209,
      role: 'Koo-koo'
    }
  ]
};

export const LeaderFocused = Template.bind({});
LeaderFocused.args = {
  data: [
    {
      id: '1',
      name: 'LeaderUser',
      profileImage: '/path/to/profile_leader.png',
      totalLikes: 200,
      role: 'Koo-koo'
    },
    {
      id: '2',
      name: 'SupportUser',
      profileImage: '/path/to/profile_support.png',
      totalLikes: 150,
      role: 'Koo-koo'
    },
    {
      id: '3',
      name: 'ContribUser',
      profileImage: '/path/to/profile_contrib.png',
      totalLikes: 100,
      role: 'Koo-koo'
    }
  ]
};

export const EmptyRankers = Template.bind({});
EmptyRankers.args = {
  data: []
};

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
      owner: {
        id: '1',
        name: 'User1',
        profileImage: '/path/to/profile1.png',
        role: 'Koo-koo'
      },
      likeCount: 3288
    },
    {
      owner: {
        id: '2',
        name: 'User2',
        profileImage: '/path/to/profile2.png',
        role: 'Koo-koo'
      },
      likeCount: 2145
    },
    {
      owner: {
        id: '3',
        name: 'User3',
        profileImage: '/path/to/profile3.png',
        role: 'Koo-koo'
      },
      likeCount: 1209
    }
  ]
};
export const LeaderFocused = Template.bind({});
LeaderFocused.args = {
  data: [
    {
      owner: {
        id: '1',
        name: 'LeaderUser',
        profileImage: '/path/to/profile_leader.png',
        role: 'Koo-koo'
      },
      likeCount: 200
    },
    {
      owner: {
        id: '2',
        name: 'SupportUser',
        profileImage: '/path/to/profile_support.png',
        role: 'Koo-koo'
      },
      likeCount: 150
    },
    {
      owner: {
        id: '3',
        name: 'ContribUser',
        profileImage: '/path/to/profile_contrib.png',
        role: 'Koo-koo'
      },
      likeCount: 100
    }
  ]
};
export const EmptyRankers = Template.bind({});
EmptyRankers.args = {
  data: []
};

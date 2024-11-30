import type { StoryFn } from '@storybook/react';
import ChallengeApplicationBody from '@/components/Body/ChallengeApplicationBody';
import type { ChallengeApplicationBodyProps } from '@/interfaces/bodyInterface';

export default {
  title: 'Components/ChallengeApplicationBody',
  component: ChallengeApplicationBody
};

const Template: StoryFn<ChallengeApplicationBodyProps> = args => <ChallengeApplicationBody {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      id: '1',
      number: 10,
      mediaType: 'socialMedia',
      title: 'Test3',
      updatedAt: '2024-01-03T00:00:00Z',
      deadline: '2024-01-17T00:00:00Z',
      status: 'canceled'
    },
    {
      id: '2',
      number: 9,
      mediaType: 'recipeWeb',
      title: 'Test4',
      updatedAt: '2024-01-04T00:00:00Z',
      deadline: '2024-01-18T00:00:00Z',
      status: 'denied'
    },
    {
      id: '3',
      number: 8,
      mediaType: 'youtube',
      title: 'Test5',
      updatedAt: '2024-01-05T00:00:00Z',
      deadline: '2024-01-19T00:00:00Z',
      status: 'onGoing'
    },
    {
      id: '4',
      number: 7,
      mediaType: 'blog',
      title: 'Test6',
      updatedAt: '2024-01-06T00:00:00Z',
      deadline: '2024-01-20T00:00:00Z',
      status: 'aborted'
    },
    {
      id: '5',
      number: 6,
      mediaType: 'youtube',
      title: 'Test1Test1Test1Test1Test1Test1Test1Test1Test1Test1Test1Test1Test1Test1Test1Test1Test1',
      updatedAt: '2024-01-01T00:00:00Z',
      deadline: '2024-01-15T00:00:00Z',
      status: 'pending'
    },
    {
      id: '6',
      number: 5,
      mediaType: 'blog',
      title: 'Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2',
      updatedAt: '2024-01-02T00:00:00Z',
      deadline: '2024-01-16T00:00:00Z',
      status: 'finished'
    },
    {
      id: '7',
      number: 4,
      mediaType: 'socialMedia',
      title: 'Test3',
      updatedAt: '2024-01-03T00:00:00Z',
      deadline: '2024-01-17T00:00:00Z',
      status: 'canceled'
    },
    {
      id: '8',
      number: 3,
      mediaType: 'recipeWeb',
      title: 'Test4',
      updatedAt: '2024-01-04T00:00:00Z',
      deadline: '2024-01-18T00:00:00Z',
      status: 'denied'
    },
    {
      id: '9',
      number: 2,
      mediaType: 'youtube',
      title: 'Test5',
      updatedAt: '2024-01-05T00:00:00Z',
      deadline: '2024-01-19T00:00:00Z',
      status: 'onGoing'
    },
    {
      id: '10',
      number: 1,
      mediaType: 'blog',
      title: 'Test6',
      updatedAt: '2024-01-06T00:00:00Z',
      deadline: '2024-01-20T00:00:00Z',
      status: 'aborted'
    }
  ]
};

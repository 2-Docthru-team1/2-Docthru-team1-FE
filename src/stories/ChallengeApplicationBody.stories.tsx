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
      number: 1,
      mediaType: 'youtube',
      title: 'Test1',
      updatedAt: '2024-01-01T00:00:00Z',
      deadline: '2024-01-15T00:00:00Z',
      status: 'pending'
    }
  ]
};

export const Approved = Template.bind({});
Approved.args = {
  data: [
    {
      number: 2,
      mediaType: 'blog',
      title: 'Test2',
      updatedAt: '2024-01-02T00:00:00Z',
      deadline: '2024-01-16T00:00:00Z',
      status: 'finished'
    }
  ]
};

export const Canceled = Template.bind({});
Canceled.args = {
  data: [
    {
      number: 3,
      mediaType: 'socialMedia',
      title: 'Test3',
      updatedAt: '2024-01-03T00:00:00Z',
      deadline: '2024-01-17T00:00:00Z',
      status: 'canceled'
    }
  ]
};

export const Denied = Template.bind({});
Denied.args = {
  data: [
    {
      number: 4,
      mediaType: 'recipeWeb',
      title: 'Test4',
      updatedAt: '2024-01-04T00:00:00Z',
      deadline: '2024-01-18T00:00:00Z',
      status: 'denied'
    }
  ]
};

export const OnGoing = Template.bind({});
OnGoing.args = {
  data: [
    {
      number: 5,
      mediaType: 'youtube',
      title: 'Test5',
      updatedAt: '2024-01-05T00:00:00Z',
      deadline: '2024-01-19T00:00:00Z',
      status: 'onGoing'
    }
  ]
};

export const Aborted = Template.bind({});
Aborted.args = {
  data: [
    {
      number: 6,
      mediaType: 'blog',
      title: 'Test6',
      updatedAt: '2024-01-06T00:00:00Z',
      deadline: '2024-01-20T00:00:00Z',
      status: 'aborted'
    }
  ]
};

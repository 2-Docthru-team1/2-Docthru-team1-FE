import type { StoryFn } from '@storybook/react';
import FeedbackCard from '@/components/Card/FeedbackCard';

const mockComments = [
  {
    id: '1',
    content: 'This is a comment.',
    createdAt: new Date().toISOString(),
    ownerId: '123',
    userName: 'John Doe'
  },
  {
    id: '2',
    content: 'Another comment for testing.',
    createdAt: new Date().toISOString(),
    ownerId: '456',
    userName: 'user2'
  }
];

const mockUser = {
  id: '123',
  name: 'John Doe',
  role: 'ko-ko'
};

export default {
  title: 'Components/FeedbackCard',
  component: FeedbackCard,
  argTypes: {}
};

const Template: StoryFn<typeof FeedbackCard> = args => <FeedbackCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  comments: mockComments,
  user: mockUser
};

export const NoComments = Template.bind({});
NoComments.args = {
  comments: [],
  user: mockUser
};

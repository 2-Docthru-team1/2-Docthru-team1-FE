import type { StoryFn } from '@storybook/react';
import FeedbackCard from '@/components/Card/FeedbackCard';

export default {
  title: 'Components/FeedbackCard',
  component: FeedbackCard,
  argTypes: {}
};

const Template: StoryFn<typeof FeedbackCard> = args => <FeedbackCard {...args} />;
export const Default = Template.bind({});
Default.args = {
  comments: [
    {
      id: '1',
      content: 'This is a comment.',
      createdAt: new Date().toISOString(),
      ownerId: '123',
      owner: {
        name: 'John Doe'
      }
    },
    {
      id: '2',
      content: 'Another comment for testing.',
      createdAt: new Date().toISOString(),
      ownerId: '456',
      owner: {
        name: 'user2'
      }
    }
  ],
  userId: '123',
  userRole: 'normal'
};

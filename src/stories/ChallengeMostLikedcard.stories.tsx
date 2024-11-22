import type { StoryFn } from '@storybook/react';
import ChallengeMostLikedCard from '../components/Card/ChallengeMostLikedCard';

export default {
  title: 'Components/ChallengeMostLikedCard',
  component: ChallengeMostLikedCard
};

const Template: StoryFn<typeof ChallengeMostLikedCard> = args => <ChallengeMostLikedCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    title: 'Delicious Kimchi',
    createdAt: '2024-11-31T00:00:00.000Z',
    description: 'A wonderful recipe for making kimchi at home.',
    role: 'normal',
    ownerId: 'Alice',
    Feedback: [],
    likeCount: 25
  }
};

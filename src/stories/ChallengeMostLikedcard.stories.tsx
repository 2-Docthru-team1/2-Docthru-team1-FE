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
    id: '1',
    title: 'Delicious Kimchi',
    createdAt: '2024-11-30T00:00:00.000Z',
    description: 'A wonderful recipe for making kimchi at home.',
    likeCount: 25,
    owner: {
      id: 'Alice',
      name: 'Alice Johnson'
    },
    images: [
      {
        imageUrl: 'example'
      }
    ]
  }
};

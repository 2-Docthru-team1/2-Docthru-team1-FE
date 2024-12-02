import type { Meta, StoryFn } from '@storybook/react';
import ChallengeDetailContentCard from '@/components/Card/ChallengeDetailContentCard';
import type { ChallengeDetailContentCardProps } from '@/interfaces/cardInterface';

const meta: Meta = {
  title: 'Components/ChallengeDetailContentCard',
  component: ChallengeDetailContentCard
};

export default meta;

const Template: StoryFn<ChallengeDetailContentCardProps> = args => <ChallengeDetailContentCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'onGoing',
  data: {
    id: '1',
    title: 'Sample Title',
    mediaType: 'youtube',
    description: 'This is a sample content for the challenge detail card.',
    requestUser: {
      id: 'JohnDoe',
      name: 'John Doe'
    },
    deadline: '2024-12-31T23:59:59.000Z',
    imageUrl: 'https://example.com/image1.jpg',
    imageUrl2: 'https://example.com/image2.jpg'
  }
};

export const WithDifferentType = Template.bind({});
WithDifferentType.args = {
  type: 'finished',
  data: {
    id: '2',
    title: 'Another Title',
    mediaType: 'recipeWeb',
    description: 'This is another sample content for the challenge detail card.',
    requestUser: {
      id: 'JaneSmith',
      name: 'Jane Smith'
    },
    deadline: '2024-11-30T23:59:59.000Z',
    imageUrl: 'https://example.com/image3.jpg',
    imageUrl2: 'https://example.com/image4.jpg'
  }
};

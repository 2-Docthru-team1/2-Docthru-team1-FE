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
    title: 'Sample Title',
    mediaType: 'youtube',
    description: 'This is a sample content for the challenge detail card.',
    ownerId: 'JohnDoe'
  }
};

export const WithDifferentType = Template.bind({});
WithDifferentType.args = {
  type: 'finished',
  data: {
    title: 'Another Title',
    mediaType: 'recipeWeb',
    description: 'This is another sample content for the challenge detail card.',
    ownerId: 'JaneSmith'
  }
};

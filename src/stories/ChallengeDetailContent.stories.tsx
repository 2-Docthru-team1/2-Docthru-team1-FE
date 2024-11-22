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
  type: 'ongoing',
  data: {
    title: 'Sample Title',
    mediaType: 'Youtube',
    content: 'This is a sample content for the challenge detail card.',
    nickname: 'JohnDoe'
  }
};

export const WithDifferentType = Template.bind({});
WithDifferentType.args = {
  type: 'finished',
  data: {
    title: 'Another Title',
    mediaType: 'Recipe Web',
    content: 'This is another sample content for the challenge detail card.',
    nickname: 'JaneSmith'
  }
};

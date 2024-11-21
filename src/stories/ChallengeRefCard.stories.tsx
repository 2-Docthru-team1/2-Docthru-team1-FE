import type { StoryFn } from '@storybook/react';
import ChallengeRefPageCard from '@/components/Card/ChallengeRefPageCard';
import type { ChallengeRefPageCardProps } from '@/interfaces/ChallengeRefInterface';

export default {
  title: 'Components/ChallengeRefPageCard',
  component: ChallengeRefPageCard
};

const Template: StoryFn<ChallengeRefPageCardProps> = args => <ChallengeRefPageCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  embedUrl: 'https://www.example.com'
};

import type { StoryObj } from '@storybook/react';
import MyChallengeHeader from '@/components/Header/MyChallengeHeader';

export default {
  title: 'Components/MyChallengeHeader',
  component: MyChallengeHeader
};

type Story = StoryObj<typeof MyChallengeHeader>;

export const Default: Story = {
  args: {}
};

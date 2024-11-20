import type { Meta, StoryObj } from '@storybook/react';
import ChallengeHeader from '@/components/Header/ChallengeHeader';

const meta: Meta<typeof ChallengeHeader> = {
  title: 'Components/ChallengeHeader',
  component: ChallengeHeader
};

export default meta;

type Story = StoryObj<typeof ChallengeHeader>;

export const Default: Story = {
  args: {}
};

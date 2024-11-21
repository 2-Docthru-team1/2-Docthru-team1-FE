import type { Meta, StoryObj } from '@storybook/react';
import ChallengeBody from '@/components/Body/ChallengeBody';

const meta: Meta<typeof ChallengeBody> = {
  title: 'Components/ChallengeBody',
  component: ChallengeBody
};

export default meta;

type Story = StoryObj<typeof ChallengeBody>;

export const Default: Story = {
  args: {}
};

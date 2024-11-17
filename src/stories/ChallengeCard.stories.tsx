import { Meta, StoryObj } from '@storybook/react';
import ChallengeCard from '@/components/Card/ChallengeCard';
import type { ChallengeData } from '@/interfaces/challengeInterface';

const meta: Meta<typeof ChallengeCard> = {
  title: 'Components/ChallengeCard',
  component: ChallengeCard,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' }
  }
};

export default meta;

type Story = StoryObj<typeof ChallengeCard>;

export const Default: Story = {
  args: {
    data: {
      status: 'On going',
      title: 'Healthy Korean Food Challenge',
      tags: ['Traditional', 'Recipe Web'],
      closingDate: '2024-12-31'
    } as ChallengeData
  }
};

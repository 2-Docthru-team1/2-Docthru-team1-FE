import { Meta, StoryObj } from '@storybook/react';
import ChallengeList from '@/components/Card/ChallengeList';
import type { ChallengeData } from '@/interfaces/challengeInterface';

const meta: Meta<typeof ChallengeList> = {
  title: 'Components/ChallengeList',
  component: ChallengeList,
  tags: ['autodocs'],
  argTypes: {
    challenges: { control: 'object' }
  }
};

export default meta;

type Story = StoryObj<typeof ChallengeList>;

export const Default: Story = {
  args: {
    challenges: [
      {
        status: 'On going',
        title: 'Healthy Korean Food Challenge',
        tags: ['Traditional', 'Recipe Web'],
        closingDate: '2024-12-31'
      },
      {
        status: 'Closed',
        title: 'Modern Cooking Challenge',
        tags: ['Fusion', 'Modern'],
        closingDate: '2024-11-15'
      }
    ] as ChallengeData[]
  }
};

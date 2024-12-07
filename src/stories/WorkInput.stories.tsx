import type { Meta, StoryObj } from '@storybook/react';
import WorkInput from '@/components/Input/WorkInput';

const meta: Meta<typeof WorkInput> = {
  title: 'Components/WorkInput',
  component: WorkInput,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};

export default meta;

type Story = StoryObj<typeof WorkInput>;

export const Default: Story = {
  args: {}
};

// src/components/ChipCard.stories.tsx
import type { Meta, StoryFn } from '@storybook/react';
import ChipCard from '@/components/Chip/ChipCard';
import type { ChipCardProps } from '@/interfaces/chipInterface';

export default {
  title: 'Components/ChipCard',
  component: ChipCard,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['success', 'error', 'info'] // type에 대한 옵션
      },
      description: 'Chip type to determine the color.'
    }
  }
} as Meta;

const Template: StoryFn<ChipCardProps> = args => <ChipCard {...args} />;

export const ongoing = Template.bind({});
ongoing.args = {
  type: 'ongoing'
};

export const finish = Template.bind({});
finish.args = {
  type: 'finished'
};

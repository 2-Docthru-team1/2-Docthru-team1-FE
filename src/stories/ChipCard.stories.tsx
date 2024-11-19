import type { StoryFn } from '@storybook/react';
import ChipCard from '@/components/Chip/ChipCard';
import type { ChipCardProps } from '@/interfaces/chipInterface';

export default {
  title: 'Components/ChipCard',
  component: ChipCard,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['success', 'error', 'info']
      },
      description: 'Chip type to determine the color.'
    }
  }
};

const Template: StoryFn<ChipCardProps> = args => <ChipCard {...args} />;

export const ongoing = Template.bind({});
ongoing.args = {
  type: 'ongoing'
};

export const finish = Template.bind({});
finish.args = {
  type: 'finished'
};

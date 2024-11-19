// src/components/ChipType.stories.tsx
import type { Meta, StoryFn } from '@storybook/react';
import ChipType from '@/components/Chip/ChipType';
import type { ChipTypeProps } from '@/interfaces/chipInterface';

export default {
  title: 'Components/ChipType',
  component: ChipType,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['traditional', 'schoolfood', 'noodle', 'banchan', 'dessert'] // 가능한 타입
      },
      description: 'Chip type to determine the background color and text.'
    }
  }
} as Meta;

const Template: StoryFn<ChipTypeProps> = args => <ChipType {...args} />;

export const Traditional = Template.bind({});
Traditional.args = {
  type: 'traditional'
};

export const SchoolFood = Template.bind({});
SchoolFood.args = {
  type: 'schoolfood'
};

export const Noodle = Template.bind({});
Noodle.args = {
  type: 'noodle'
};

export const BanChan = Template.bind({});
BanChan.args = {
  type: 'banchan'
};

export const Dessert = Template.bind({});
Dessert.args = {
  type: 'dessert'
};

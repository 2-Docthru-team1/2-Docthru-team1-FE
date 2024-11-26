import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import OptionBox from '@/components/OptionBox/OptionBox';
import type { OptionBoxProps } from '@/interfaces/optionboxInterface';

export default {
  title: 'Components/OptionBox',
  component: OptionBox
} as Meta;

const Template: StoryFn<OptionBoxProps> = (args: OptionBoxProps) => <OptionBox {...args} />;

export const Ongoing = Template.bind({});
Ongoing.args = {
  type: 'onGoing'
};

export const Participate = Template.bind({});
Participate.args = {
  type: 'participate'
};

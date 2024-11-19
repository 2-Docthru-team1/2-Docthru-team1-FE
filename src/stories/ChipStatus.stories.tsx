import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ChipStatus from '@/components/Chip/ChipStatus';
import type { ChipStatusProps } from '@/interfaces/chipInterface';

export default {
  title: 'Components/ChipStatus',
  component: ChipStatus,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['pend', 'deny', 'approve', 'cancel']
      }
    }
  }
} as Meta;

const Template: StoryFn<ChipStatusProps> = args => <ChipStatus {...args} />;

export const Pending = Template.bind({});
Pending.args = {
  type: 'pend'
};

export const Denied = Template.bind({});
Denied.args = {
  type: 'deny'
};

export const Approved = Template.bind({});
Approved.args = {
  type: 'approve'
};

export const Canceled = Template.bind({});
Canceled.args = {
  type: 'cancel'
};

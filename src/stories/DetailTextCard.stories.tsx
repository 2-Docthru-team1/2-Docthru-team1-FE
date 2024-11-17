import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import DetailTextCard from '@/components/Card/DetailTextCard';
import type { DetailTextCardProps } from '@/interfaces/cardInterface';

const meta: Meta<DetailTextCardProps> = {
  title: 'Components/DetailTextCard',
  component: DetailTextCard
};

export default meta;

const Template: StoryFn<DetailTextCardProps> = args => <DetailTextCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'ingredient',
  content: ['This is the first line of content.', 'Here is the second line of content.', 'And this is the third line of content.']
};

export const Direction = Template.bind({});
Direction.args = {
  type: 'direction',
  content: ['This is the first line of content.', 'Here is the second line of content.', 'And this is the third line of content.']
};

export const Nutrition = Template.bind({});
Nutrition.args = {
  type: 'nutrition',
  content: { calories: '400', carbs: '45', protein: '15', fat: '20', sugars: '10', sodium: '150', fiber: '5' }
};

export const Benefit = Template.bind({});
Benefit.args = {
  type: 'benefit',
  content: ['This is the first line of content.', 'Here is the second line of content.', 'And this is the third line of content.']
};

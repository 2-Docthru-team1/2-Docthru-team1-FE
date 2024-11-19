import type { Meta, StoryFn } from '@storybook/react';
import ChipCategory from '@/components/Chip/ChipCategory';
import type { ChipCategoryProps } from '@/interfaces/chipInterface';

const Template: StoryFn<typeof ChipCategory> = (args: ChipCategoryProps) => <ChipCategory {...args} />;

// 다양한 스토리 구성
export const Youtube = Template.bind({});
Youtube.args = {
  mediaType: 'Youtube'
};

export const Blog = Template.bind({});
Blog.args = {
  mediaType: 'Blog'
};

export const RecipeWeb = Template.bind({});
RecipeWeb.args = {
  mediaType: 'Recipe Web'
};

export const SocialMedia = Template.bind({});
SocialMedia.args = {
  mediaType: 'Social Media'
};

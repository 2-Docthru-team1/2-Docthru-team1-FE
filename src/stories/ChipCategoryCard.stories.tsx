import type { StoryFn } from '@storybook/react';
import ChipCategory from '@/components/Chip/ChipCategory';
import type { ChipCategoryProps } from '@/interfaces/chipInterface';

export default {
  title: 'Components/ChipCategory',
  component: ChipCategory,
  argTypes: {
    mediaType: {
      control: {
        type: 'select',
        options: ['Youtube', 'Blog', 'Recipe Web', 'Social Media'] // type에 대한 옵션
      },
      description: 'Chip'
    }
  }
};

const Template: StoryFn<typeof ChipCategory> = (args: ChipCategoryProps) => <ChipCategory {...args} />;

// 다양한 스토리 구성
export const Youtube = Template.bind({});
Youtube.args = {
  mediaType: 'youtube'
};

export const Blog = Template.bind({});
Blog.args = {
  mediaType: 'blog'
};

export const RecipeWeb = Template.bind({});
RecipeWeb.args = {
  mediaType: 'recipeWeb'
};

export const SocialMedia = Template.bind({});
SocialMedia.args = {
  mediaType: 'socialMedia'
};

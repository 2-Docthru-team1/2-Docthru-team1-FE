import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import RecipeCard from '@/components/Card/RecipeCard';
import type { RecipeCardProps } from '@/interfaces/cardInterface';

const meta: Meta<typeof RecipeCard> = {
  title: 'Components/RecipeCard',
  component: RecipeCard
};

export default meta;

const Template: StoryFn<RecipeCardProps> = args => <RecipeCard {...args} />;

export const LoadingState = Template.bind({});
LoadingState.args = {
  data: null
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  data: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    images: ['/path/to/image1.png'],
    category: '디저트',
    title: '초콜릿 케이크',
    likeCount: 120
  }
};

export const WithMultipleImages = Template.bind({});
WithMultipleImages.args = {
  data: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    images: ['/path/to/image1.png'],
    category: '메인 요리',
    title: '스테이크',
    likeCount: 250
  }
};

export const WithoutLikes = Template.bind({});
WithoutLikes.args = {
  data: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    images: ['/path/to/image3.png'],
    category: '샐러드',
    title: '그린 샐러드',
    likeCount: 0
  }
};

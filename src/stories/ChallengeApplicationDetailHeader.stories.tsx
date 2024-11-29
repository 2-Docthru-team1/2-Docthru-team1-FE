import type { StoryFn } from '@storybook/react';
import React from 'react';
import ChallengeApplicationDetailHeader from '@/components/Header/ChallengeApplicationDetailHeader';

export default {
  title: 'Components/ChallengeApplicationDetailHeader',
  component: ChallengeApplicationDetailHeader
};

const Template: StoryFn<typeof ChallengeApplicationDetailHeader> = args => <ChallengeApplicationDetailHeader {...args} />;

const mockData = {
  id: '1',
  number: '1023',
  title: 'Sample Challenge Title',
  mediaType: 'recipeWeb'
};

export const Default = Template.bind({});
Default.args = {
  data: {
    id: '1',
    number: '1023',
    title: 'Sample Challenge Title',
    mediaType: 'recipeWeb'
  },
  totalCount: 5
};

export const WithSocialMedia = Template.bind({});
WithSocialMedia.args = {
  data: {
    ...mockData,
    mediaType: 'socialMedia',
    title: 'Social Media Challenge'
  },
  totalCount: 10
};

export const WithYoutube = Template.bind({});
WithYoutube.args = {
  data: {
    ...mockData,
    mediaType: 'youtube',
    title: 'YouTube Challenge'
  },
  totalCount: 3
};

export const WithBlog = Template.bind({});
WithBlog.args = {
  data: {
    ...mockData,
    mediaType: 'blog',
    title: 'Blog Challenge'
  },
  totalCount: 8
};

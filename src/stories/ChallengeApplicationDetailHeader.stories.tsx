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
    mediaType: 'recipeWeb',
    description: 'A sample description for the challenge.',
    requestUser: { id: 'user1', name: 'John Doe' },
    deadline: '2024-12-31',
    imageUrl: 'https://via.placeholder.com/150',
    imageUrl2: 'https://via.placeholder.com/150/0000FF'
  },
  totalCount: 5
};

export const WithSocialMedia = Template.bind({});
WithSocialMedia.args = {
  data: {
    id: '2',
    number: '1024',
    title: 'Social Media Challenge',
    mediaType: 'socialMedia',
    description: 'A challenge focused on social media platforms.',
    requestUser: { id: 'user2', name: 'Jane Smith' },
    deadline: '2024-11-30',
    imageUrl: 'https://via.placeholder.com/150',
    imageUrl2: 'https://via.placeholder.com/150/FF0000'
  },
  totalCount: 10
};

export const WithYoutube = Template.bind({});
WithYoutube.args = {
  data: {
    id: '3',
    number: '1025',
    title: 'YouTube Challenge',
    mediaType: 'youtube',
    description: 'A challenge for creating YouTube content.',
    requestUser: { id: 'user3', name: 'Chris Johnson' },
    deadline: '2024-10-15',
    imageUrl: 'https://via.placeholder.com/150',
    imageUrl2: 'https://via.placeholder.com/150/00FF00'
  },
  totalCount: 3
};

export const WithBlog = Template.bind({});
WithBlog.args = {
  data: {
    id: '4',
    number: '1026',
    title: 'Blog Challenge',
    mediaType: 'blog',
    description: 'A challenge for writing blog posts.',
    requestUser: { id: 'user4', name: 'Emily Brown' },
    deadline: '2024-09-01',
    imageUrl: 'https://via.placeholder.com/150',
    imageUrl2: 'https://via.placeholder.com/150/FFFF00'
  },
  totalCount: 8
};

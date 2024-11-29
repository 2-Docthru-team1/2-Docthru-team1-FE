import type { StoryFn } from '@storybook/react';
import ChallengeApplicationDetailHeader from '@/components/Header/ChallengeApplicationDetailHeader';

export default {
  title: 'Components/ChallengeApplicationDetailHeader',
  component: ChallengeApplicationDetailHeader
};

const Template: StoryFn<typeof ChallengeApplicationDetailHeader> = args => <ChallengeApplicationDetailHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      id: '1',
      number: '1023',
      title: 'Sample Challenge Title',
      mediaType: 'recipeWeb'
    },
    {
      id: '1',
      number: '1023',
      title: 'Sample Challenge Title',
      mediaType: 'recipeWeb'
    },
    {
      id: '1',
      number: '1023',
      title: 'Sample Challenge Title',
      mediaType: 'recipeWeb'
    },
    {
      id: '1',
      number: '1023',
      title: 'Sample Challenge Title',
      mediaType: 'recipeWeb'
    },
    {
      id: '1',
      number: '1023',
      title: 'Sample Challenge Title',
      mediaType: 'recipeWeb'
    }
  ],
  totalCount: 5
};

export const WithSocialMedia = Template.bind({});
WithSocialMedia.args = {
  data: [
    {
      id: '1',
      number: '1024',
      title: 'Social Media Challenge',
      mediaType: 'socialMedia'
    },
    {
      id: '1',
      number: '1023',
      title: 'Sample Challenge Title',
      mediaType: 'recipeWeb'
    },
    {
      id: '1',
      number: '1023',
      title: 'Sample Challenge Title',
      mediaType: 'recipeWeb'
    },
    {
      id: '1',
      number: '1023',
      title: 'Sample Challenge Title',
      mediaType: 'recipeWeb'
    }
  ],
  totalCount: 10
};

export const WithYoutube = Template.bind({});
WithYoutube.args = {
  data: [
    {
      id: '1',
      number: '1025',
      title: 'YouTube Challenge',
      mediaType: 'youtube'
    },
    {
      id: '1',
      number: '1025',
      title: 'YouTube Challenge',
      mediaType: 'youtube'
    },
    {
      id: '1',
      number: '1025',
      title: 'YouTube Challenge',
      mediaType: 'youtube'
    },
    {
      id: '1',
      number: '1025',
      title: 'YouTube Challenge',
      mediaType: 'youtube'
    },
    {
      id: '1',
      number: '1025',
      title: 'YouTube Challenge',
      mediaType: 'youtube'
    }
  ],
  totalCount: 3
};

export const WithBlog = Template.bind({});
WithBlog.args = {
  data: [
    {
      id: '1',
      number: '1026',
      title: 'Blog Challenge',
      mediaType: 'blog'
    },
    {
      id: '1',
      number: '1026',
      title: 'Blog Challenge',
      mediaType: 'blog'
    },
    {
      id: '1',
      number: '1026',
      title: 'Blog Challenge',
      mediaType: 'blog'
    },
    {
      id: '1',
      number: '1026',
      title: 'Blog Challenge',
      mediaType: 'blog'
    },
    {
      id: '1',
      number: '1026',
      title: 'Blog Challenge',
      mediaType: 'blog'
    }
  ],
  totalCount: 8
};

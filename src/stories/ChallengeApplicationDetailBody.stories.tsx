import type { StoryFn } from '@storybook/react';
import ChallengeApplicationDetailBody from '@/components/Body/ChallengeApplicationDetailBody';

export default {
  title: 'Components/ChallengeApplicationDetailBody',
  component: ChallengeApplicationDetailBody
};

const Template: StoryFn<typeof ChallengeApplicationDetailBody> = args => <ChallengeApplicationDetailBody {...args} />;

// Mock data
const mockData = {
  id: '1',
  embedUrl: 'https://www.example.com/embedded-content'
};

export const Default = Template.bind({});
Default.args = {
  data: mockData
};

export const WithDifferentUrl = Template.bind({});
WithDifferentUrl.args = {
  data: {
    id: '2',
    embedUrl: 'https://www.example.com/another-embedded-content'
  }
};

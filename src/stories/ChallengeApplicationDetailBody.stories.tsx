import type { StoryFn } from '@storybook/react';
import ChallengeApplicationDetailBody from '@/components/Body/ChallengeApplicationDetailBody';

export default {
  title: 'Components/ChallengeApplicationDetailBody',
  component: ChallengeApplicationDetailBody
};

const Template: StoryFn<typeof ChallengeApplicationDetailBody> = args => <ChallengeApplicationDetailBody {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: '1',
    status: 'onGoing',
    embedUrl: 'https://www.example.com/embedded-content'
  }
};

export const WithDifferentUrl = Template.bind({});
WithDifferentUrl.args = {
  data: {
    id: '2',
    status: 'onGoing',
    embedUrl: 'https://www.example.com/another-embedded-content'
  }
};

import type { StoryFn } from '@storybook/react';
import ChallengeApplyDropdown from '@/components/Dropdown/ChallengeApplyDropdown';

export default {
  title: 'Components/ChallengeApplyDropdown',
  component: ChallengeApplyDropdown
};

const Template: StoryFn<typeof ChallengeApplyDropdown> = args => <ChallengeApplyDropdown />;

export const Default = Template.bind({});
Default.args = {};

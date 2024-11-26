import type { StoryFn } from '@storybook/react';
import { useState } from 'react';
import ChallengeApplyDropdown from '@/components/Dropdown/ChallengeApplyDropdown';

export default {
  title: 'Components/ChallengeApplyDropdown',
  component: ChallengeApplyDropdown
};

const [selectedMediaType, setSelectedMediaType] = useState('');
const [mediaTypeError, setMediaTypeError] = useState(false);

const Template: StoryFn<typeof ChallengeApplyDropdown> = args => (
  <ChallengeApplyDropdown
    setSelectedOption={setSelectedMediaType}
    selectedOption={selectedMediaType}
    setTypeError={setMediaTypeError}
  />
);

export const Default = Template.bind({});
Default.args = {};

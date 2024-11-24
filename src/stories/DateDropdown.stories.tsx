import type { StoryFn } from '@storybook/react';
import { useState } from 'react';
import DateDropdown from '@/components/Dropdown/DateDropdown';

export default {
  title: 'Components/DateDropdown',
  component: DateDropdown
};

const Template: StoryFn = args => {
  const [selectedDate, setSelectedDate] = useState('');
  const [typeError, setTypeError] = useState(false);

  return (
    <div className="w-[300px]">
      <DateDropdown {...args} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setTypeError={setTypeError} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  selectedDate: ''
};

export const WithSelectedDate = Template.bind({});
WithSelectedDate.args = {
  selectedDate: '24/12/04'
};

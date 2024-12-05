import type { StoryFn } from '@storybook/react';
import ToastComponent from '@/components/Toast/Toast';
import type { ToastProps } from '@/interfaces/toastInterface';

export default {
  title: 'Components/ToastComponent',
  component: ToastComponent
};

const Template: StoryFn<ToastProps> = args => <ToastComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'This is a toast message!',
  onClose: () => alert('Toast closed!'),
  duration: 10000
};

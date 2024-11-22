import type { StoryFn } from '@storybook/react';
import SignInput from '@/components/Input/SignInput';
import type { SignInputProps } from '@/interfaces/signInterface';

export default {
  title: 'Components/SignInput',
  component: SignInput,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password']
    },
    label: { control: 'text' },
    placeholder: { control: 'text' }
  }
};

const Template: StoryFn<SignInputProps> = args => <SignInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  label: 'Username',
  placeholder: 'Please enter your username'
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  type: 'email',
  label: 'Email',
  placeholder: 'Please enter your email'
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  type: 'password',
  label: 'Password',
  placeholder: 'Please enter your password'
};

export const ConfirmPasswordInput = Template.bind({});
ConfirmPasswordInput.args = {
  type: 'password',
  label: 'Confirm Password',
  placeholder: 'Please enter your password again'
};

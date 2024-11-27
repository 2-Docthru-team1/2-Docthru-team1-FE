import type { StoryFn } from '@storybook/react';
import ProfileModal from '@/components/Modal/ProfileModal';
import type { ProfileModalProps } from '@/interfaces/userInterface';

export default {
  title: 'Components/ProfileModal',
  component: ProfileModal
};

const Template: StoryFn<ProfileModalProps> = args => <ProfileModal {...args} />;

export const AdminProfile = Template.bind({});
AdminProfile.args = {
  name: 'User',
  role: 'admin'
};

export const MemberProfile = Template.bind({});
MemberProfile.args = {
  name: 'User',
  role: 'normal'
};

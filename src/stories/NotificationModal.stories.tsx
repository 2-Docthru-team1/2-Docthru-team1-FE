import type { StoryFn } from '@storybook/react';
import NotificationModal from '@/components/Modal/NotificationModal';
import type { NotificationModalProps } from '@/interfaces/modalInterface';

export default {
  title: 'NotificationModal',
  component: NotificationModal
};

const Template: StoryFn<NotificationModalProps> = args => <NotificationModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  notifications: []
};

export const EmptyNotifications = Template.bind({});
EmptyNotifications.args = {
  notifications: []
};

export const MultipleNotifications = Template.bind({});
MultipleNotifications.args = {
  notifications: [{ challengeId: '1', message: '새로운 알림입니다.', createdAt: '2024-12-04T06:39:07.703Z' }]
};

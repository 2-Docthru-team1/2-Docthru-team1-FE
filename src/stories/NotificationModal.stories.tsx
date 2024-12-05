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
  notifications: [
    { id: '01', isRead: false, challengeId: '1', message: '새로운 알림입니다.', createdAt: '2024-12-04T06:39:07.703Z' },
    { id: '02', isRead: true, challengeId: '2', message: '업데이트가 완료되었습니다.', createdAt: '2024-12-04T06:45:07.703Z' },
    {
      id: '03',
      isRead: false,
      challengeId: '3',
      message: '시스템 점검이 예정되어 있습니다.',
      createdAt: '2024-12-04T08:29:07.703Z'
    }
  ]
};

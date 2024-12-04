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
    { content: '새로운 알림입니다.', time: '2024-12-04T06:39:07.703Z' },
    { content: '업데이트가 완료되었습니다.', time: '2024-12-04T06:45:07.703Z' },
    { content: '시스템 점검이 예정되어 있습니다.', time: '2024-12-04T08:29:07.703Z' },
    { content: '새로운 알림입니다.', time: '2024-12-04T06:39:07.703Z' },
    { content: '업데이트가 완료되었습니다.', time: '2024-12-04T06:45:07.703Z' },
    {
      content:
        '시스템 점검이 예정되어 있습니다.시스템 점검이 예정되어 있습니다.시스템 점검이 예정되어 있습니다.시스템 점검이 예정되어 있습니다.시스템 점검이 예정되어 있습니다.',
      time: '2024-12-04T08:29:07.703Z'
    },
    { content: '새로운 알림입니다.', time: '2024-12-04T06:39:07.703Z' },
    { content: '업데이트가 완료되었습니다.', time: '2024-12-04T06:45:07.703Z' },
    { content: '시스템 점검이 예정되어 있습니다.', time: '2024-12-04T08:29:07.703Z' }
  ]
};

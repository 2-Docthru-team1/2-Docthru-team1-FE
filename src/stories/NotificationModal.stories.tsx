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
  args: {}
};

export const EmptyNotifications = Template.bind({});
EmptyNotifications.args = {
  args: {
    notifications: []
  }
};

export const MultipleNotifications = Template.bind({});
MultipleNotifications.args = {
  args: {
    notifications: [
      { content: '새로운 알림입니다.', time: '2024-12-04 10:30:00' },
      { content: '업데이트가 완료되었습니다.', time: '2024-12-04 09:45:00' },
      { content: '시스템 점검이 예정되어 있습니다.', time: '2024-12-03 17:20:00' }
    ]
  }
};

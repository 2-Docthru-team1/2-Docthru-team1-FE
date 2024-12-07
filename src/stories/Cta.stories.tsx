import type { Meta, StoryFn } from '@storybook/react';
// Story 타입을 import
import Cta from '@/components/Button/Cta';

const meta: Meta<typeof Cta> = {
  title: 'Components/Cta', // 컴포넌트의 위치를 올바르게 설정
  component: Cta,
  argTypes: {
    url: {
      control: { type: 'text' },
      description: 'The URL to which the button will link.'
    },
    children: {
      control: { type: 'text' },
      description: 'The text or elements displayed inside the button.'
    }
  }
};

export default meta; // meta 객체를 export

const Template: StoryFn<typeof Cta> = args => <Cta {...args} />; // Story 타입을 명확히 지정

export const Default = Template.bind({});
Default.args = {
  url: '/signin',
  children: 'Go to Sign-in'
};

export const WithCustomText = Template.bind({});
WithCustomText.args = {
  url: '/about',
  children: 'Learn More About Us'
};

export const WithLongText = Template.bind({});
WithLongText.args = {
  url: '/contact',
  children: 'Contact Us for More Information and Inquiries'
};

import type { Meta } from '@storybook/react';
import Cta from '@/components/Button/Cta';

const meta: Meta<typeof Cta> = {
  title: 'Button/Cta',
  component: Cta
};

export default {
  title: 'Components/Cta',
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
} as Meta;

const Template: Story = args => <Cta {...args} />;

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

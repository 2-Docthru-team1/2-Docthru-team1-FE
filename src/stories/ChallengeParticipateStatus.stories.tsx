import type { StoryFn } from '@storybook/react';
import ChallengeParticipateStatus from '@/components/Card/ChallengeParticipateStatus';
import type { ChallengeParticipateStatusProps } from '@/interfaces/cardInterface';

export default {
  title: 'Components/ChallengeParticipateStatus',
  component: ChallengeParticipateStatus,
  argTypes: {
    data: {
      control: {
        type: 'object'
      },
      description: '참가자 데이터 배열'
    }
  }
};

const participantData = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    createdAt: '2024-11-25T02:12:14.440Z',
    updatedAt: '2024-11-25T02:12:14.440Z',
    deletedAt: '2024-11-25T02:12:14.440Z',
    title: 'string',
    content: 'string',
    likeCount: 0,
    images: [
      {
        imageUrl: 'string'
      }
    ],
    challengeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    owner: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'string',
      email: 'user@example.com',
      role: 'normal'
    }
  }
];

const Template: StoryFn<ChallengeParticipateStatusProps> = args => <ChallengeParticipateStatus {...args} />;

export const Default = Template.bind({});
Default.args = {
  list: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      createdAt: '2024-11-25T02:12:14.440Z',
      updatedAt: '2024-11-25T02:12:14.440Z',
      deletedAt: '2024-11-25T02:12:14.440Z',
      title: 'string',
      content: 'string',
      likeCount: 0,
      images: [
        {
          imageUrl: 'https://hancook-bucket.s3.ap-northeast-2.amazonaws.com/bibimbab.png'
        }
      ],
      challengeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      owner: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
        email: 'user@example.com',
        role: 'normal'
      }
    }
  ],
  totalCount: 1
};

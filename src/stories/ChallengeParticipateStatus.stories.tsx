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
    id: 'd4e8cde5-47f4-4e5e-8e0b-8c5b2d9c2b5d',
    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: '2024-11-18T00:00:00.000Z',
    deleteAt: null,
    title: 'title 1',
    content: 'content 1',
    likeCount: 15,
    likeUsers: [],
    Feedback: ['Great content!', 'Very useful.', 'Would recommend to others.'],
    ownerId: 'b1a2d3e4-f5b6-7c8d-9a0b-1c2d3e4f5a6',
    challengeId: '166cc4d7-d09b-4a82-a213-5e94a47c95b9',
    images: ['/temporaryAssets/food.svg'],
    nickname: 'Alice',
    role: 'normal'
  },
  {
    id: 'a2b3c4d5-67e8-9f0a-1b2c-3d4e5f6a7b8c',
    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: '2024-11-18T00:00:00.000Z',
    deleteAt: null,
    title: 'title 2',
    content: 'content 2',
    likeCount: 12,
    likeUsers: [],
    Feedback: ['Informative!', 'Helped me a lot.'],
    ownerId: 'c7d8e9f0-1a2b-3c4d-5e6f-7g8h9i0j1k2l',
    challengeId: '166cc4d7-d09b-4a82-a213-5e94a47c95b9',
    images: ['/temporaryAssets/food.svg'],
    nickname: 'Bob',
    role: 'normal'
  },
  {
    id: 'f1e2d3c4-5b6a-7f8e-9g0h-1i2j3k4l5m6',
    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: '2024-11-18T00:00:00.000Z',
    deleteAt: null,
    title: 'title 3',
    content: 'content 3',
    likeCount: 10,
    likeUsers: [],
    Feedback: ['Very insightful.', 'I learned something new.'],
    ownerId: 'n1o2p3q4-r5s6-t7u8-v9w0-x1y2z3a4b5c6',
    challengeId: '166cc4d7-d09b-4a82-a213-5e94a47c95b9',
    images: ['/temporaryAssets/food.svg'],
    nickname: 'Charlie',
    role: 'normal'
  },
  {
    id: 'b1c2d3e4-5f6a-7b8c-9d0e-1f2g3h4i5j6k',
    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: '2024-11-18T00:00:00.000Z',
    deleteAt: null,
    title: 'title 4',
    content: 'content 4',
    likeCount: 8,
    likeUsers: [],
    Feedback: ['Interesting perspective.'],
    ownerId: 'd7e8f9g0-h1i2-j3k4-l5m6-n7o8p9q0r1s2',
    challengeId: '166cc4d7-d09b-4a82-a213-5e94a47c95b9',
    images: ['/temporaryAssets/food.svg'],
    nickname: 'David',
    role: 'normal'
  },
  {
    id: 'c0d1e2f3-4g5h-6i7j-8k9l-0m1n2o3p4q5r',
    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: '2024-11-18T00:00:00.000Z',
    deleteAt: null,
    title: 'title 5',
    content: 'content 5',
    likeCount: 5,
    likeUsers: [],
    Feedback: ['Could use more examples.'],
    ownerId: 'e3f4g5h6-i7j8-k9l0-m1n2-o3p4q5r6s7t8',
    challengeId: '166cc4d7-d09b-4a82-a213-5e94a47c95b9',
    images: ['/temporaryAssets/food.svg'],
    nickname: 'Eva',
    role: 'normal'
  },
  {
    id: 'a4b5c6d7-e8f9-0g1h-2i3j-4k5l6m7n8o9p',
    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: '2024-11-18T00:00:00.000Z',
    deleteAt: null,
    title: 'title 6',
    content: 'content 6',
    likeCount: 3,
    likeUsers: [],
    Feedback: ['Needs more depth.', 'Not very clear.'],
    ownerId: 'f0g1h2i3-j4k5-l6m7-n8o9-p0q1r2s3t4u5',
    challengeId: '166cc4d7-d09b-4a82-a213-5e94a47c95b9',
    images: ['/temporaryAssets/food.svg'],
    nickname: 'Frank',
    role: 'normal'
  },
  {
    id: 'b6c7d8e9-f0g1-h2i3-j4k5-l6m7n8o9p0q1',
    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: '2024-11-18T00:00:00.000Z',
    deleteAt: null,
    title: 'title 7',
    content: 'content 7',
    likeCount: 1,
    likeUsers: [],
    Feedback: ['Not very engaging.'],
    ownerId: 'h1i2j3k4-l5m6-n7o8-p9q0-r1s2t3u4v5w6',
    challengeId: '166cc4d7-d09b-4a82-a213-5e94a47c95b9',
    images: ['/temporaryAssets/food.svg'],
    nickname: 'Grace',
    role: 'normal'
  },
  {
    id: 'e7f8g9h0-i1j2-k3l4-m5n6-o7p8q9r0s1t2',
    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: '2024-11-18T00:00:00.000Z',
    deleteAt: null,
    title: 'title 8',
    content: 'content 8',
    likeCount: 0,
    likeUsers: [],
    Feedback: [],
    ownerId: 'j2k3l4m5-n6o7-p8q9-r0s1-t2u3v4w5x6y7',
    challengeId: '166cc4d7-d09b-4a82-a213-5e94a47c95b9',
    images: ['/temporaryAssets/food.svg'],
    nickname: 'Hannah',
    role: 'normal'
  }
];

const Template: StoryFn<ChallengeParticipateStatusProps> = args => <ChallengeParticipateStatus {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: participantData
};

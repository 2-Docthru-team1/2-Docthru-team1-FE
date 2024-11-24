import type { StoryFn } from '@storybook/react';
// 컴포넌트 경로에 맞게 수정해주세요.
import { useState } from 'react';
import DateDropdown from '@/components/Dropdown/DateDropdown';

// Default export로 메타데이터 정의
export default {
  title: 'Components/DateDropdown', // 스토리북 내에서 보여질 카테고리 및 컴포넌트 이름
  component: DateDropdown,
  argTypes: {
    setSelectedDate: { action: 'setSelectedDate' },
    setTypeError: { action: 'setTypeError' }
  }
};

// 기본 Story 정의
const Template: StoryFn = args => {
  const [selectedDate, setSelectedDate] = useState('');
  const [typeError, setTypeError] = useState(false);

  return (
    <div className="w-[300px]">
      {' '}
      {/* 컴포넌트 크기 조정 */}
      <DateDropdown {...args} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setTypeError={setTypeError} />
    </div>
  );
};

// 기본 이야기
export const Default = Template.bind({});
Default.args = {
  selectedDate: '' // 기본값으로 선택된 날짜 없음
};

// 날짜가 선택된 경우
export const WithSelectedDate = Template.bind({});
WithSelectedDate.args = {
  selectedDate: '24/12/04' // 기본값으로 선택된 날짜 예시
};

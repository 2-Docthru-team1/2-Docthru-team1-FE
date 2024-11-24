import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import calendarIcon from '@/../public/assets/icon_calendar.png';

interface DateDropdownProps {
  setSelectedDate: (date: string) => void; // 날짜를 부모 컴포넌트에 전달하는 함수
  selectedDate: string; // 부모로부터 전달받은 선택된 날짜
  setTypeError: (error: boolean) => void;
}

export default function DateDropdown({ setSelectedDate, selectedDate, setTypeError }: DateDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isErrorTriggered, setIsErrorTriggered] = useState(false);
  const [dateInput, setDateInput] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickDropdown = () => {
    setIsErrorTriggered(false); // 에러 상태 초기화
    setIsDropdownOpen(prev => !prev);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setDateInput(date);
    setIsDropdownOpen(false);
    setTypeError(false); // 에러 상태 초기화
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateInput(value);
    setSelectedDate(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (!dateInput) {
          setIsErrorTriggered(true);
          setTypeError(true);
        }
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dateInput, setTypeError]);

  // 현재 날짜를 DD/MM/YY 형식으로 변환하는 함수
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${year}/${month}/${day}`;
  };

  // 날짜 드롭다운에서 날짜 선택 시, 그 날짜로 업데이트
  const handleDateClick = (date: Date) => {
    handleDateSelect(formatDate(date));
  };

  return (
    <div className="flex flex-col" ref={dropdownRef}>
      <div
        className={`h-[5.6rem] rounded-[1.2rem] px-[1.6rem] flex justify-between items-center bg-primary-white cursor-pointer border
          ${isDropdownOpen ? 'border-primary-beige' : dateInput ? 'border-gray-200' : isErrorTriggered ? 'border-error-red' : 'border-gray-200'}
        `}
        onClick={handleClickDropdown}
      >
        <input
          type="text"
          value={dateInput}
          onChange={handleInputChange}
          placeholder="YY / MM / DD"
          className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 bg-transparent outline-none placeholder:text-[1.6rem] placeholder-gray-400"
        />
        <Image src={calendarIcon} alt="calendar" className="cursor-pointer" />
      </div>
      {isErrorTriggered && !dateInput && (
        <div className="absolute text-error-red text-[1.2rem] mt-[6rem] ml-[0.5rem]">This field is required.</div>
      )}
      {isDropdownOpen && (
        <div className="relative">
          <div className="absolute w-full border border-gray-200 rounded-[1.2rem] bg-primary-white overflow-hidden">
            {/* 달력 UI 예시: 여기서는 날짜를 선택할 수 있는 간단한 예시입니다. */}
            {[...Array(30)].map((_, index) => {
              const date = new Date();
              date.setDate(index + 1);
              return (
                <div
                  key={index}
                  className="flex h-[4rem] justify-center items-center border-b border-gray-200 cursor-pointer"
                  onClick={() => handleDateClick(date)}
                >
                  <p className="font-normal text-[1.6rem] leading-[1.909rem]">{formatDate(date)}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import calendarIcon from '@/../public/assets/icon_calendar.png';

interface DateDropdownProps {
  setSelectedDate: (date: string) => void; // 부모 컴포넌트로 날짜 전달
  selectedDate: string; // 선택된 날짜
  setTypeError: (error: boolean) => void;
}

export default function DateDropdown({ setSelectedDate, selectedDate, setTypeError }: DateDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isErrorTriggered, setIsErrorTriggered] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // 현재 달
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 날짜 포맷팅 함수 (YY/MM/DD 형식)
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${year}/${month}/${day}`;
  };

  // 선택한 날짜를 업데이트
  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    setIsDropdownOpen(false);
    setTypeError(false);
  };

  // 현재 달의 날짜 배열 생성
  const generateDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = new Date(year, month, index + 1);
      return (
        <div
          key={index}
          className="flex h-[4rem] w-[4rem] justify-center items-center cursor-pointer hover:bg-gray-100 rounded-full"
          onClick={() => handleDateSelect(day)}
        >
          <p className="text-gray-700 font-medium">{day.getDate()}</p>
        </div>
      );
    });
  };

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col relative" ref={dropdownRef}>
      {/* 드롭다운 입력 필드 */}
      <div
        className={`h-[5.6rem] rounded-[1.2rem] px-[1.6rem] flex justify-between items-center bg-primary-white cursor-pointer border
          ${isDropdownOpen ? 'border-primary-beige' : selectedDate ? 'border-gray-200' : isErrorTriggered ? 'border-error-red' : 'border-gray-200'}
        `}
        onClick={() => setIsDropdownOpen(prev => !prev)}
      >
        <input
          type="text"
          value={selectedDate}
          readOnly
          placeholder="YY / MM / DD"
          className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 bg-transparent outline-none placeholder:text-[1.6rem] placeholder-gray-400"
        />
        <Image src={calendarIcon} alt="calendar" className="cursor-pointer" />
      </div>

      {/* 드롭다운 UI */}
      {isDropdownOpen && (
        <div className="absolute top-[6.5rem] left-0 w-full border border-gray-200 rounded-[1.2rem] bg-primary-white shadow-lg p-[1rem] z-10">
          {/* 달력 상단: 월 이동 버튼 */}
          <div className="flex justify-between items-center mb-[1rem]">
            <button onClick={handlePrevMonth} className="text-gray-600 hover:text-gray-900">
              &lt;
            </button>
            <p className="font-medium text-[1.6rem]">
              {currentMonth.toLocaleString('default', { year: 'numeric', month: 'long' })}
            </p>
            <button onClick={handleNextMonth} className="text-gray-600 hover:text-gray-900">
              &gt;
            </button>
          </div>

          {/* 달력 날짜 */}
          <div className="grid grid-cols-7 gap-[0.5rem]">{generateDaysInMonth(currentMonth)}</div>
        </div>
      )}
    </div>
  );
}

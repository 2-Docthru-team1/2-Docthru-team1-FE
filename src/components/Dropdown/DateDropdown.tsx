import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import calendarIcon from '@/../public/assets/icon_calendar.png';

interface DateDropdownProps {
  setSelectedDate: (date: string) => void;
  selectedDate: string;
  setTypeError: (error: boolean) => void;
}

export default function DateDropdown({ setSelectedDate, selectedDate, setTypeError }: DateDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isErrorTriggered, setIsErrorTriggered] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${year}/${month}/${day}`;
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    setIsDropdownOpen(false);
    setTypeError(false);
  };

  const generateDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = new Date(year, month, index + 1);

      const isPast = day < today;

      if (isPast) {
        return (
          <div key={index} className="flex h-[4rem] w-[4rem] justify-center items-center text-gray-300 cursor-not-allowed">
            <p>{day.getDate()}</p>
          </div>
        );
      }

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

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

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
      <div
        className={`h-[5.6rem] rounded-[1.2rem] px-[2rem] flex justify-between items-center bg-primary-white cursor-pointer border
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

      {isDropdownOpen && (
        <div className="absolute top-[6rem] left-0 w-full border border-gray-200 rounded-[1.2rem] bg-primary-white shadow-lg p-[1rem] z-10">
          <div className="flex justify-between items-center mb-[1rem]">
            <button onClick={handlePrevMonth} className={`text-[1.6rem] text-gray-600 hover:text-gray-900 hover:font-bold`}>
              &lt;
            </button>
            <p className="font-medium text-[1.6rem]">
              {currentMonth.toLocaleString('default', { year: 'numeric', month: 'long' })}
            </p>
            <button onClick={handleNextMonth} className="text-[1.6rem] text-gray-600 hover:text-gray-900 hover:font-bold">
              &gt;
            </button>
          </div>
          <div className="aligns-center grid grid-cols-7 gap-[0.5rem] text-[1.5rem]">{generateDaysInMonth(currentMonth)}</div>
        </div>
      )}
    </div>
  );
}

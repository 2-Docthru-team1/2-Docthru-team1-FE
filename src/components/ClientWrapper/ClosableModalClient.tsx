import Image from 'next/image';
import { useState } from 'react';
import toggleDown from '@/../public/assets/ic_toggle_down.png';
import Dropdown from '@/components/Dropdown/Dropdown';
import ClosableModal from '@/components/Modal/ClosableModal';

const options = [
  { label: 'English (default)', value: 'english' },
  { label: '한국어', value: 'korean' },
  { label: '日本語', value: 'japanese' },
  { label: '中文', value: 'chinese' }
];

interface ClosableModalClientProps {
  isOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function ClosableModalClient({ isOpen, setIsModalOpen }: ClosableModalClientProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleSelectLanguage = (value: string) => {
    setSelectedLanguage(value);
    setIsDropdownOpen(false);
  };

  const handleApply = () => {
    setIsModalOpen(false);
  };

  const getSelectedLanguageLabel = () => {
    const selectedOption = options.find(option => option.value === selectedLanguage);
    return selectedOption ? selectedOption.label : 'Language';
  };

  return (
    <div>
      <ClosableModal isOpen={isOpen} onClose={() => setIsModalOpen(false)} title="Select your language">
        <div
          className="w-[44.8rem] h-[5.6rem] flex justify-between items-center mt-[2.4rem] gap-[1rem] rounded-[0.8rem] border border-gray-200 py-[0.4rem] px-[1.6rem]"
          onClick={toggleDropdown}
        >
          <p
            className={`w-[38.4rem] h-[4rem] flex items-center font-normal text-[1.6rem] leading-[1.909rem] text-gray-400
            ${selectedLanguage ? 'text-gray-700' : ''}`}
          >
            {getSelectedLanguageLabel() || 'Language'}
          </p>
          <Image src={toggleDown} alt="아래 화살표" />
        </div>
        {isDropdownOpen && (
          <Dropdown
            isOpen={isDropdownOpen}
            items={options}
            onSelect={handleSelectLanguage}
            type="language"
            onApply={handleApply}
            onClose={toggleDropdown}
          />
        )}
        <button
          className="rounded-[0.8rem] bg-primary-blue w-full h-[4.8rem] mt-[1.6rem] font-semibold text-[1.6rem] leading-[1.909rem] text-[#ffffff]"
          onClick={handleApply}
        >
          Apply
        </button>
      </ClosableModal>
    </div>
  );
}

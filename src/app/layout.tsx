'use client';

import localFont from 'next/font/local';
import Image from 'next/image';
import { useState } from 'react';
import toggleDown from '@/../public/assets/ic_toggle_down.png';
import ClosableModal from '@/components/ClosableModal/ClosableModal';
import Dropdown from '@/components/Dropdown/Dropdown';
import Nav from '@/components/Nav/Nav';
import '../styles/globals.css';
import { metadata } from './metadata';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { label: 'English (default)', value: 'english' },
    { label: '한국어', value: 'korean' },
    { label: '日本語', value: 'japanese' },
    { label: '中文', value: 'chinese' }
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleSelectLanguage = (value: string) => {
    setSelectedLanguage(value);
    setIsDropdownOpen(false);
  };

  const handleApply = () => {
    console.log(`Selected language: ${selectedLanguage}`);
    setIsModalOpen(false);
  };

  const getSelectedLanguageLabel = () => {
    const selectedOption = options.find(option => option.value === selectedLanguage);
    return selectedOption ? selectedOption.label : 'Language';
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>{metadata.title!}</title>
        <meta name="description" content={metadata.description!} />
      </head>
      <body className={pretendard.className}>
        <Nav userStatus="loggedOut" setIsModalOpen={setIsModalOpen} />
        {children}
        <ClosableModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Select your language">
          <div
            className="w-[44.8rem] h-[5.6rem] flex justify-between items-center mt-[2.4rem] gap-[1rem] rounded-[0.8rem] border border-gray-200 py-[0.4rem] px-[1.6rem]"
            onClick={toggleDropdown}
          >
            <p className="w-[38.4rem] h-[4rem] flex items-center font-normal text-[1.6rem] leading-[1.909rem] text-gray-400">
              {getSelectedLanguageLabel() || 'Language'}
            </p>
            <Image src={toggleDown} alt="아래 화살표" />
          </div>
          {isDropdownOpen && <Dropdown isOpen={isDropdownOpen} items={options} onSelect={handleSelectLanguage} type="language" />}
          <button
            className="rounded-[0.8rem] bg-primary-blue w-full h-[4.8rem] mt-[1.6rem] font-semibold text-[1.6rem] leading-[1.909rem] text-[#ffffff]"
            onClick={handleApply}
          >
            Apply
          </button>
        </ClosableModal>
      </body>
    </html>
  );
}

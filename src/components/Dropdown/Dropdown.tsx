import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import activeCheckBox from '@/../public/assets/btn_active_checkbox.png';
import inActiveCheckBox from '@/../public/assets/btn_inactive_checkbox.png';
import activeRadio from '@/../public/assets/btn_radio_checked.png';
import inactiveRadio from '@/../public/assets/btn_radio_unchecked.png';
import close from '@/../public/assets/ic_out.png';
import type { CategoryType, DropdownProps } from '@/interfaces/dropdownInterface';
import type { ChallengeOption, Option } from '@/interfaces/filterBarInterface';
import useStore from '@/store/store';

const dropdownWidths = {
  language: 'w-[44.8rem]',
  recipe: 'w-[15.1rem]',
  challenge: 'w-[34.3rem]',
  admin: 'w-[16.3rem]'
};

export default function Dropdown({ isOpen, items, type, onApply, onClose }: DropdownProps) {
  const router = useRouter();
  const {
    selectedView,
    selectedMedia,
    selectedStatus,
    setSelectedView,
    setSelectedMedia,
    setSelectedStatus,
    category,
    setCategory,
    toggleDropdown,
    isFilterApplied,
    setIsFilterApplied
  } = useStore();

  const dropdownType = dropdownWidths[type] || '';

  const handleSelect = (value: string, category?: CategoryType) => {
    if (category === 'view') {
      setSelectedView(value);
    } else if (category === 'media') {
      if (selectedMedia?.includes(value)) {
        setSelectedMedia(selectedMedia.filter(item => item !== value));
      } else {
        setSelectedMedia([...selectedMedia, value]);
      }
    } else if (category === 'status') {
      setSelectedStatus(value);
    }

    const queryString = new URLSearchParams(window.location.search);
    queryString.set(category || 'category', value);
    router.push(`?${queryString.toString()}`);

    toggleDropdown(false);
  };

  const handleReset = () => {
    setSelectedView('');
    setSelectedStatus('');

    const queryString = new URLSearchParams(window.location.search);
    queryString.delete('view');
    queryString.delete('status');
    router.push(`?${queryString.toString()}`);
  };

  const handleApply = () => {
    const mediaArray = selectedMedia || [];
    const selectedCount = (selectedView ? 1 : 0) + mediaArray.length + (selectedStatus ? 1 : 0);
    if (selectedCount > 0) {
      onApply(selectedView || '', mediaArray, selectedStatus || '');
    }
    onClose();
  };

  const renderItems = () => {
    if (type === 'challenge') {
      const flattenedItems = (items as ChallengeOption[])[0];
      const { view, media, status } = flattenedItems;

      return (
        <div className="w-full border-2 border-gray-200 rounded-[0.8rem]">
          <div className="flex justify-between px-[1.6rem] pt-[1.6rem]">
            <p className="font-semibold text-[1.6rem] leading-[1.909rem] text-gray-700">Sort</p>
            <Image src={close} alt="닫기" onClick={() => onClose()} />
          </div>
          <div key="view-section" className="py-[1.2rem] px-[1.6rem]">
            <div className="font-semibold text-[1.4rem] leading-[1.671rem] text-gray-700 mt-[1.1rem] mb-[1.2rem]">
              View Option Type
            </div>
            {view.map(item => (
              <div key={`view-${item.value}`} className="flex mb-[1.2rem] items-center gap-[0.4rem]">
                <Image src={selectedView === item.value ? activeRadio : inactiveRadio} alt="radio" />
                <p
                  onClick={() => handleSelect(item.value, 'view')}
                  className="w-full font-normal text-[1.4rem] leading-[1.671rem] text-gray-700 items-center flex cursor-pointer"
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="border border-gray-200 w-full mt-[1.2rem] mb-[1.2rem]" />
          <div key="media-section" className="w-full py-[1.2rem] px-[1.6rem]">
            <div className="font-semibold text-[1.4rem] leading-[1.671rem] text-gray-700 mt-[1.1rem] mb-[1.2rem]">
              Recipe Media Type
            </div>
            {media.map(item => (
              <div key={`media-${item.value}`} className="flex items-center gap-[0.4rem] mb-[1.2rem]">
                <Image src={selectedMedia?.includes(item.value) ? activeCheckBox : inActiveCheckBox} alt="checkbox" />
                <p
                  onClick={() => handleSelect(item.value, 'media')}
                  className="w-full font-normal text-[1.4rem] leading-[1.671rem] text-gray-700 items-center flex cursor-pointer"
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="border border-gray-200 w-full mt-[1.2rem] mb-[1.2rem]" />
          <div key="status-section" className="w-full py-[1.2rem] px-[1.6rem]">
            <div className="font-semibold text-[1.4rem] leading-[1.671rem] text-gray-700 mt-[1.1rem] mb-[1.2rem]">Status</div>
            {status.map(item => (
              <div key={`status-${item.value}`} className="flex mb-[1.2rem] items-center gap-[0.4rem]">
                <Image src={selectedStatus === item.value ? activeRadio : inactiveRadio} alt="radio" />
                <p
                  onClick={() => handleSelect(item.value, 'status')}
                  className="w-full font-normal text-[1.4rem] leading-[1.671rem] text-gray-700 items-center flex cursor-pointer"
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between p-[1.6rem]">
            <button
              onClick={handleReset}
              className="w-[13.4rem] h-[4rem] py-[0.2rem] px-[1.6rem] border border-gray-200 font-semibold text-[1.6rem] leading-[1.909rem] text-gray-700 rounded-[0.8rem]"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="w-[16.9rem] h-[4rem] rounded-[0.8rem] bg-primary-blue font-bold text-[1.4rem] leading-[2.6rem] text-[#ffffff]"
            >
              Apply
            </button>
          </div>
        </div>
      );
    } else {
      return (items as Option[]).map((item, index) => (
        <p
          key={item.value}
          onClick={() => handleSelect(item.value)}
          className={`w-full py-[1.2rem] font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 items-center flex justify-center
          ${index < items.length - 1 ? 'border-b border-gray-300' : ''}`}
        >
          {item.label}
        </p>
      ));
    }
  };

  return (
    <div className={`absolute ${dropdownType} mt-[0.8rem]`}>
      {isOpen && (
        <div className="flex items-center justify-center flex-col rounded-[0.8rem] bg-[#ffffff] border border-gray-300">
          {renderItems()}
        </div>
      )}
    </div>
  );
}

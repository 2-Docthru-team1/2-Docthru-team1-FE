import Image from 'next/image';
import type { CategoryType, DropdownProps } from '@/interfaces/dropdownInterface';
import type { ChallengeOption, Option } from '@/interfaces/filterBarInterface';
import useStore from '@/store/store';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

const dropdownWidths = {
  language: 'md:w-[44.8rem] sm:w-[31.1rem]',
  challenge: 'w-[34.3rem]',
  admin: 'w-[16.3rem]'
};

export default function Dropdown({ isOpen, items, onSelect, type, onApply, onClose }: DropdownProps) {
  const { selectedView, selectedMedia, selectedStatus, setSelectedView, setSelectedMedia, setSelectedStatus } = useStore();

  const dropdownType = dropdownWidths[type] || '';

  const handleSelect = (value: string, category?: CategoryType) => {
    if (category === 'mediaType') {
      let updatedMedia;
      if (selectedMedia?.includes(value)) {
        updatedMedia = selectedMedia.filter(item => item !== value);
      } else {
        updatedMedia = [...(selectedMedia || []), value];
      }
      setSelectedMedia(updatedMedia);
    } else if (category === 'orderBy') {
      setSelectedView(selectedView === value ? '' : value);
    } else if (category === 'status') {
      setSelectedStatus(selectedStatus === value ? '' : value);
    }
  };

  const handleReset = () => {
    setSelectedView('');
    setSelectedMedia([]);
    setSelectedStatus('');
  };

  const handleApply = () => {
    const mediaArray = selectedMedia || [];
    const selectedCount = (selectedView ? 1 : 0) + mediaArray.length + (selectedStatus ? 1 : 0);

    if (selectedCount > 0) {
      onApply(selectedView || '', mediaArray, selectedStatus || '');
    } else {
      onApply('', [], '');
    }

    onClose();
  };

  const renderItems = () => {
    if (type === 'challenge') {
      const flattenedItems = (items as ChallengeOption[])[0];
      const { orderBy, mediaType, status } = flattenedItems;

      return (
        <div className="w-full border-2 border-gray-200 rounded-[0.8rem]">
          <div className="flex justify-between px-[1.6rem] pt-[1.6rem]">
            <p className="font-semibold text-[1.6rem] leading-[1.909rem] text-gray-700">Sort</p>
            <Image
              src={`${S3_BASE_URL}/ic_out.svg`}
              alt="닫기"
              onClick={() => onClose()}
              className="cursor-pointer"
              width={24}
              height={24}
            />
          </div>
          <div key="view-section" className="pt-[1.2rem] pb-[1.4rem] px-[1.6rem]">
            <div className="font-semibold text-[1.4rem] leading-[1.671rem] text-gray-700 mt-[1.1rem] mb-[1.2rem]">
              View Option Type
            </div>
            {orderBy.map(item => (
              <div key={`view-${item.value}`} className="flex mb-[0.4rem] items-center gap-[0.4rem]">
                <Image
                  src={
                    selectedView === item.value
                      ? `${S3_BASE_URL}/btn_radio_checked.svg`
                      : `${S3_BASE_URL}/btn_radio_unchecked.svg`
                  }
                  alt="radio"
                  className="cursor-pointer"
                  onClick={() => handleSelect(item.value, 'orderBy')}
                  width={24}
                  height={24}
                />
                <p
                  onClick={() => handleSelect(item.value, 'orderBy')}
                  className="w-full font-normal text-[1.4rem] leading-[1.671rem] text-gray-700 items-center flex cursor-pointer"
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="border border-gray-200 w-full" />
          <div key="media-section" className="w-full pt-[1.2rem] pb-[2.4rem] px-[1.6rem]">
            <div className="font-semibold text-[1.4rem] leading-[1.671rem] text-gray-700 mb-[1.2rem]">Recipe Media Type</div>
            {mediaType.map(item => (
              <div key={`media-${item.value}`} className="flex items-center gap-[0.4rem] mb-[0.4rem]">
                <Image
                  src={
                    selectedMedia?.includes(item.value)
                      ? `${S3_BASE_URL}/btn_active_checkbox.svg`
                      : `${S3_BASE_URL}/btn_inactive_checkbox.svg`
                  }
                  alt="checkbox"
                  className="cursor-pointer"
                  onClick={() => handleSelect(item.value, 'mediaType')}
                  width={24}
                  height={24}
                />
                <p
                  onClick={() => handleSelect(item.value, 'mediaType')}
                  className="w-full font-normal text-[1.4rem] leading-[1.671rem] text-gray-700 items-center flex cursor-pointer"
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="border border-gray-200 w-full" />
          <div key="status-section" className="w-full py-[1.2rem] px-[1.6rem]">
            <div className="font-semibold text-[1.4rem] leading-[1.671rem] text-gray-700 mb-[1.2rem]">Status</div>
            {status.map(item => (
              <div key={`status-${item.value}`} className="flex mb-[0.4rem] items-center gap-[0.4rem]">
                <Image
                  src={
                    selectedStatus === item.value
                      ? `${S3_BASE_URL}/btn_radio_checked.svg`
                      : `${S3_BASE_URL}/btn_radio_unchecked.svg`
                  }
                  alt="radio"
                  className="cursor-pointer"
                  onClick={() => handleSelect(item.value, 'status')}
                  width={24}
                  height={24}
                />
                <p
                  onClick={() => handleSelect(item.value, 'status')}
                  className="w-full font-normal text-[1.4rem] leading-[1.671rem] text-gray-700 items-center flex cursor-pointer"
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between p-[1.6rem] gap-[0.8rem]">
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
          onClick={() => onSelect(item.value)}
          className={`w-full py-[1.2rem] font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 items-center flex justify-center
          ${index < items.length - 1 ? 'border-b border-gray-300' : ''}`}
        >
          {item.label}
        </p>
      ));
    }
  };

  return (
    <div className={`absolute ${dropdownType} mt-[0.8rem] z-20`}>
      {isOpen && (
        <div className="flex items-center justify-center flex-col rounded-[0.8rem] bg-primary-white">{renderItems()}</div>
      )}
    </div>
  );
}

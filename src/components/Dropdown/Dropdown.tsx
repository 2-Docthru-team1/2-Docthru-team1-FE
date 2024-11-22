import type { CategoryType, DropdownProps, OnSelectFunction } from '@/interfaces/dropdownInterface';
import type { ChallengeOption, Option } from '@/interfaces/filterBarInterface';

const dropdownWidths = {
  language: 'w-[44.8rem]',
  recipe: 'w-[15.1rem]',
  challenge: 'w-[34.3rem]',
  admin: 'w-[16.3rem]'
};

export default function Dropdown({
  isOpen,
  items,
  onSelect,
  type,
  selectedCuisine,
  selectedMedia,
  selectedStatus
}: Omit<DropdownProps, 'onSelect'> & { onSelect: OnSelectFunction }) {
  const dropdownType = dropdownWidths[type] || '';

  const handleSelect = (value: string, category?: CategoryType) => {
    if (category) {
      onSelect(value, category);
    } else {
      onSelect(value);
    }
  };

  const renderItems = () => {
    if (type === 'challenge') {
      const flattenedItems = (items as ChallengeOption[])[0];
      const { cuisine, media, status } = flattenedItems;

      return [
        <div key="cuisine-section" className="w-full">
          <div className="px-4 py-2 bg-gray-100 text-gray-600 text-sm">Cuisine</div>
          {cuisine.map((item, index) => (
            <p
              key={`cuisine-${item.value}`}
              onClick={() => onSelect(item.value, 'cuisine')}
              className={`w-full py-[1.2rem] font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 items-center flex justify-center cursor-pointer
              ${selectedCuisine === item.value ? 'bg-blue-50' : ''}
              ${index < cuisine.length - 1 ? 'border-b border-gray-300' : ''}`}
            >
              {item.label}
            </p>
          ))}
        </div>,
        <div key="media-section" className="w-full">
          <div className="px-4 py-2 bg-gray-100 text-gray-600 text-sm">Media</div>
          {media.map((item, index) => (
            <p
              key={`media-${item.value}`}
              onClick={() => onSelect(item.value, 'media')}
              className={`w-full py-[1.2rem] font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 items-center flex justify-center cursor-pointer
              ${selectedMedia?.includes(item.value) ? 'bg-blue-50' : ''}
              ${index < media.length - 1 ? 'border-b border-gray-300' : ''}`}
            >
              {item.label}
              {selectedMedia?.includes(item.value) && <span className="ml-2">✓</span>}
            </p>
          ))}
        </div>,
        <div key="status-section" className="w-full">
          <div className="px-4 py-2 bg-gray-100 text-gray-600 text-sm">Status</div>
          {status.map((item, index) => (
            <p
              key={`status-${item.value}`}
              onClick={() => onSelect(item.value, 'status')}
              className={`w-full py-[1.2rem] font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 items-center flex justify-center cursor-pointer
              ${selectedStatus === item.value ? 'bg-blue-50' : ''}
              ${index < status.length - 1 ? 'border-b border-gray-300' : ''}`}
            >
              {item.label}
            </p>
          ))}
        </div>
      ];
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
